const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Place = require('./models/place')

//Connect to DB
mongoose.connect('mongodb://localhost:27017/places');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log('Connection succeeded!')
});

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
