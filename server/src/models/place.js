const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: String,
  google_place_id: String,
  sentiment_score: Number,
  sentiment_strength: Number,
  address: String,
  phone_number: String,
  photo: String
})

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;