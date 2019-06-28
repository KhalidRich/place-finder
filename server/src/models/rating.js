const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user_id: String,
  google_place_id: String,
  rating: Number
});

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;