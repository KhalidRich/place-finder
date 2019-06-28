import Api from '@/services/Api';

export default {
    fetchHelloMessage() {
        return Api().get('')
    },
    fetchPlaces() {
        return Api().get('places')
    },
    getNearbyPlaces(location, keyword) {
        const path = `search?location=${location.lat},${location.lng}&keyword=${keyword}`
        return Api().get(path)
    },
    addPlace(params) {
        return Api().post('places', params)
    },
    submitRating(user_id, google_place_id, rating) {
        const path = `rate?user_id=${user_id}&google_place_id=${google_place_id}&rating=${rating}`;
        return Api().post(path)
    },
    getLikedPlacesForUser(user_id) {
        const path = `liked?user_id=${user_id}`
        return Api().get(path)
    }
}