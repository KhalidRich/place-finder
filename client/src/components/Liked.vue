<template>
  <div class="liked">
    <h1>Your Likes</h1>
    Here are some of the places you've liked! Looking for more? <a href="/search">Search</a> here!
    <div class="places_results container">
      <div v-if="places.length == 0">
        You don't have any favorites. Go <a href="/search">search</a> for some.</a>
      </div>        
      <div class="child" v-bind:class="place.google_place_id" v-for="place in places">
        <br />
        <span><b>{{ place.name }}</b></span> <br />
        <span><b>Address</b>: <i> {{ place.address }} </i></span><br />
        <span><b>Phone Number</b>: {{ place.phone_number }}</span><br />
        <br />
        <button class="submit_dislike_btn" v-bind:class="place.google_place_id" @click="removeFavorite(place.google_place_id)"><i class="fas fa-times fa-3x"></i></button>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'

export default {
  name: 'liked',
  data () {
    return {
      places: []
    }
  },
  mounted() {
    return this.getLikedPlaces()
  },
  methods: {
    async getLikedPlaces() {
      const response = await PlacesService.getLikedPlacesForUser(1) //Temp using user id 1
      this.places = response.data
    },
    async removeFavorite(google_place_id) {
      const user_id = 1; //For now
      const rating = await PlacesService.submitRating(user_id, google_place_id, -1);
      this.places = this.places.filter(place => place.google_place_id != google_place_id)
      const element = document.getElementsByClassName(google_place_id)[0]
      element.parentNode.removeChild(element)
    }
  }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    width: 75%;
    min-height: 100%;
    margin: 0px auto;
    background-color: #BDBDBD;
    animation: grow 5s infinite;
}

.child {
    min-width: 10em;
    min-height: 10em;
    margin: 0.4em;
    border-radius: 1em;
    width: 45%;
    background-color: lightblue;
}

.positive {
  background-color: #c7f2cd
}

.extremely-positive {
  background-color: #91bd98
}

.negative {
  background-color: #e0abab;
}

.extremely-negative {
  background-color: #c48686;
}
</style>