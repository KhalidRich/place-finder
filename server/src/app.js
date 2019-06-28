const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Place = require('./models/place');
const GooglePlacesService = require('./services/google-places-service');
const SentimentAnalysisService = require('./services/sentiment-analysis-service');
const DatabaseService = require('./services/database-service');

//Connect to DB
mongoose.connect('mongodb://localhost:27017/places');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log('Connection succeeded!')
});

const googlePlacesService = new GooglePlacesService('AIzaSyCy8lMzc7kUWmCbOnAth4W1eZbhWVN043k')
const sentimentAnalysisService = new SentimentAnalysisService();
const databaseService = new DatabaseService();

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(
        [{
            name: "Khalid Richards",
            msg: "It works!"
        }]
    )
})

// Store a new place in our DB.
app.post('/places', (req, res) => {
    const name = req.body.name;
    const googlePlacesId = req.body.google_place_id;
    const place = new Place({
        name: name,
        google_place_id: googlePlacesId
    });

    place.save(function (err) {
        if (err) {
            console.log(err)
        }
        res.send({
            success: true,
            message: 'Successfully added Google place'
        });
    });
})

app.get('/search', async (req, res) => {
    const location = req.query.location;
    const keyword = req.query.keyword;
    let places;
    try {
        places = await googlePlacesService.findNearbyPlaces(location, keyword);
    } catch(error) {
        console.log(error);
        res.send({success: false, error: error}); 
    }
    const placeResponses = await Promise.all(places.map(async place => {
        // Do we have this record in the DB?
        const googlePlaceId = place.place_id;
        let rec = await databaseService.getPlaceById(googlePlaceId);
        let placeRecord;
        if (!rec) {
            placeRecord = {
                name: place.name,
                google_place_id: googlePlaceId
            };
            let sentiments = {};
            const details = await googlePlacesService.getPlaceDetails(place.place_id);
            const reviews = details.reviews;
            if (reviews) {
                const reviewText = reviews.map(review => {
                    return review.text;
                });
                sentiments = await sentimentAnalysisService.analyzePlace(place.place_id, reviewText);
            }
            placeRecord.phone_number = details.phone_number || '';
            placeRecord.address = details.address || '';
            placeRecord.photo = details.photo || '';
            placeRecord.sentiment_score = sentiments.score || -2; //Range for valid score is -1 to 1
            placeRecord.sentiment_strength = sentiments.magnitude || -1; //Range for valid mag is 0 to inf
            await databaseService.createNewPlace(placeRecord);
        } else {
            placeRecord = {
                name: rec.name,
                google_place_id: rec.google_place_id,
                sentiment_score: rec.sentiment_score,
                sentiment_strength: rec.sentiment_strength
            }
        }
        placeRecord.address = place.vicinity;
        const reviewSummary = await databaseService.getReviewSummaryForPlace(place.place_id);
        placeRecord.review_summary = reviewSummary;
        return placeRecord;
    }));
    res.send(placeResponses);
})

// Endpoint to get places that the user likes.
app.get('/liked', async (req, res) => {
    const userId = req.query.user_id;
    const places = await databaseService.getLikedPlacesForUser(userId);
    res.send(places);    
})

// Endpoint to submit likes/dislikes for places.
app.post('/rate', async (req, res) => {
    const user_id = req.query.user_id;
    const google_place_id = req.query.google_place_id;
    const rateValue = req.query.rating;

    if (!user_id) {
        res.send({
            status: "error",
            message: "No user provided."
        });
    }

    if (!google_place_id) {
        res.send({
            status: "error",
            message: "No place specified"
        });
    }

    const rating = await databaseService.createRating(user_id, google_place_id, rateValue);
    res.send(rating);
})

// Retrieves all places
app.get('/places', (req, res) => {
    Place.find({}, 'name google_place_id', (err, places) => {
        if (err) { console.log(err); }
        res.send({
            places: places
        });
    }).sort({_id: -1})
})

app.listen(process.env.PORT || 8081);
