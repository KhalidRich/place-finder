<template>
  <div class="places_search">
    <h1>Search for your next destination!</h1>
    <div class="form">
      <div>
        <button class="get_location_btn" @click="getLocation">Get Your Location</button>
        {{ lat }} {{ lng }} {{ searchTerm }}
      </div>
      <div>
        <input type="text" name="searchTerm" placeholder="What do you want to look for?" v-model="searchTerm">
      </div>
      <div>
        <button class="submit_query_btn" @click="getPlaces">Let's Find Your Places!</button>
      </div>
    </div>
  </div>
</template>

<script>
import GooglePlacesService from '@/services/GooglePlacesService'

export default {
  name: 'SearchPage',
  data() {
    return {
      lat: 0.0,
      lng: 0.0,
      searchTerm: ''
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition);
      } else {
        alert('Geolocation is not supported by your browser, honey.')
      }
    },
    setPosition(pos) {
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
    },
    async getPlaces() {
      const location = {
        lat: this.lat,
        lng: this.lng
      }

      const places = await GooglePlacesService.getPlaces(location, this.searchTerm)
      alert(JSON.stringify(places))
    }
  }
}
</script>
