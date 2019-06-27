const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: String,
  google_place_id: String
})

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;