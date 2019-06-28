import axios from 'axios' 

export default {
  GooglePlacesApiBase() {
    return axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api/place'
    })
  },
  getPlaces(location, searchTerm) {
    const format = 'json'
    const googleApiKey = 'AIzaSyCy8lMzc7kUWmCbOnAth4W1eZbhWVN043k'; //Note: We should never put secrets in buuuut...
    const inputtype = 'textquery'
    const locationStr = `${location.lat},${location.lng}`
    const radius=2.2
    const queryString = `${format}?key=${googleApiKey}&input=${searchTerm}&inputtype=${inputtype}&location=${locationStr}`
    const requestUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/${queryString}`
    alert(`Making request to ${requestUri}`)
    return axios.get(requestUri)
  }
}