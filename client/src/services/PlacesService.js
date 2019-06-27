import Api from '@/services/Api';

export default {
    fetchHelloMessage() {
        return Api().get('');
    },
    fetchPlaces() {
        return Api().get('places');
    },
    addPlace(params) {
        return Api().post('places', params);

    }
}