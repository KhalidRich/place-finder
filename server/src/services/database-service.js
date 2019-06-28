const Place = require('../models/place');
const Rating = require('../models/rating');

class DatabaseService {
  constructor() {
  }

  async createNewPlace(placeFields) {
    const args = {
      name: placeFields.name,
      google_place_id: placeFields.google_place_id,
      sentiment_score: placeFields.sentiment_score,
      sentiment_strength: placeFields.sentiment_strength,
      address: placeFields.address,
      phone_number: placeFields.phone_number,
      photo: placeFields.photo
    };

    const place = new Place(args);
    await place.save();
  }

  async getPlaceById(googlePlaceId) {
    const query = Place.findOne({ google_place_id: googlePlaceId });
    const place = await query.exec();
    return place ? place : null;
  }

  async createRating(userId, googlePlaceId, rating) {
    // 1. Is there already a rating for this user?
    let ratingRecord = await this.getRating(userId, googlePlaceId);
    if (ratingRecord) {
      return await this.updateRating(ratingRecord, rating);
    } else {
      const args = {
        user_id: userId,
        google_place_id: googlePlaceId,
        rating: rating
      };
      ratingRecord = new Rating(args);
      await ratingRecord.save();
      return ratingRecord;
    } 
  }

  async updateRating(ratingRecord, rating) {
    if (ratingRecord.rating == rating) {
      ratingRecord.rating = 0; //We just want to cancel it out.
    } else {
      ratingRecord.rating = rating;
    }
    await ratingRecord.save();
    return ratingRecord;
  }

  async getRating(userId, googlePlaceId) {
    const query = Rating.findOne({
      google_place_id: googlePlaceId,
      user_id: userId
    });
    const rating = await query.exec();
    return rating ? rating : null;
  }

  async getLikedPlacesForUser(userId) {
    const query = Rating.find({ 
      user_id: userId,
      rating: 1
    });
    const ratings = await query.exec();
    const places = await Promise.all(ratings.map(async rating => {
      return this.getPlaceById(rating.google_place_id);
    }));
    return places;
  }

  async getReviewSummaryForPlace(googlePlaceId) {
    const query = Rating.find({
      google_place_id: googlePlaceId
    });
    const ratings = await query.exec();
    let summary = {
      positive: 0,
      negative: 0,
      neutral: 0
    }
    ratings.forEach(rating => {
      switch(rating.rating) {
        case -1:
          summary.negative += 1;
          break;
        case 1:
          summary.positive += 1;
          break;
        default:
          summary.netural += 1;
          break;
      }
    });
    return summary;
  }
}

module.exports = DatabaseService;