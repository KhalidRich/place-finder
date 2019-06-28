const axios = require('axios');

class GooglePlacesService {
  constructor(apiKey) {
    this.apiKey = apiKey
    if (!this.apiKey) {
      throw Error('API Key must be provided to use Google Places');
    }
  }

  async findNearbyPlaces(location, keyword) {
    const path = `nearbysearch/json?key=${this.apiKey}&location=${location}&radius=8000&keyword=${keyword}`;
    const uri =  `https://maps.googleapis.com/maps/api/place/${path}`;
    const response = await axios.get(uri);
    let places = [];
    if (response.data.status == 'OK') {
      places = response.data.results;
    }
    return places;
  }

  async getPlaceDetails(googlePlaceId) {
    const path = `details/json?key=${this.apiKey}&placeid=${googlePlaceId}&fields=review,formatted_address,photo,formatted_phone_number`
    const uri = `https://maps.googleapis.com/maps/api/place/${path}`;
    const response = await axios.get(uri);
    if (response.data.status == 'OK') {
      const result = response.data.result;
      return {
        reviews: result.reviews,
        address: result.formatted_address,
        photo: result.photo,
        phone_number: result.formatted_phone_number
      };
    }
    return null;
  }
}

module.exports = GooglePlacesService