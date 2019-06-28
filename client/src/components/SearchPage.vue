<template>
  <div class="places_search">
    <h1>Search for your next destination!</h1>
    <div class="form search-container">
        <input type="text" class="search-box" name="searchTerm" placeholder="What do you want to look for?" v-model="searchTerm">
        <vs-button color="primary" class="submit-query-btn" @click="getLocation">Let's Find Your Places!</vs-button>
    </div>
    <h1> Results </h1>
    <div class="places_results container">
      <div class="child" v-for="place in places" v-bind:class="place.scoreClass">
        <span><b>{{ place.name }}</b></span> <br />
        <span><b>Address</b>: <i> {{ place.address }} </i></span><br />
        <span><b>Phone Number</b>: {{ place.phone_number }}</span><br />
        Google users tend to feel <b>{{ place.sentimentContext }}</b> about this place!
        <span v-if="place.total == 0"> No users have liked this place yet! </span>
        <span v-else> {{ place.review_summary.positive }} out of {{ place.total }} users liked this place.</span>
        <br />
        <button class="submit_like_btn" @click="submitLike(place.google_place_id)"><i class="far fa-heart fa-3x"></i></button>
        <button class="submit_dislike_btn" @click="submitDislike(place.google_place_id)"><i class="fas fa-times fa-3x"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'

export default {
  name: 'SearchPage',
  data() {
    return {
      lat: 0.0,
      lng: 0.0,
      searchTerm: '',
      places: []
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
    async setPosition(pos) {
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
      await this.getPlaces();
    },
    async getPlaces() {
      const location = {
        lat: this.lat,
        lng: this.lng
      }
      const resp = await PlacesService.getNearbyPlaces(location, this.searchTerm)
      const places = resp.data
      places.forEach(place => {
        place.scoreClass = this.getColorClass(place);
        place.sentimentContext = this.contextualizeSentiment(place);
        const positives = place.review_summary.positive
        const negatives = place.review_summary.negative
        const neutrals = place.review_summary.neutral
        place.total = positives + negatives + neutrals
      })
      this.places = places;
    },
    async submitLike(google_place_id) {
      const user_id = 1; //For now
      const rating = await PlacesService.submitRating(user_id, google_place_id, 1);
      alert(`We got the rating! ${JSON.stringify(rating)}`);
    },
    async submitDislike(google_place_id) {
      const user_id = 1; //For now
      const rating = await PlacesService.submitRating(user_id, google_place_id, -1);
      alert(`We got the rating! ${JSON.stringify(rating)}`);
    },
    getColorClass(place) {
      const score = place.sentiment_score
      if (score > 0.7) {
        return 'extremely-positive'
      } else if(score > 0 && score <= 0.7) {
        return 'positive'
      } else if(score == 0) {
        return 'neutral'
      } else if(score < 0 && score > -0.7) {
        return 'negative'
      } else if (score < -0.7 && score > -1) {
        return 'extremely-negative'
      } else {
        return 'neutral'
      }
    },
    contextualizeSentiment(place) {
      switch(place.scoreClass) {
        case 'extremely-positive':
          return 'extremely positive'
        case 'positive':
          return 'positive'
        case 'neutral':
          return 'neither positive nor negative'
        case 'negative':
          return 'negative'
        case 'extremely-negative':
          return 'extremely negative'
        default:
          return 'undecided'
      }

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

.search-container {
  margin-top: 15px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.search-box {
  font-size: 24px;
  display: inline-block;
  margin-left: 500px;
  margin-right: 0px;
  width: 22%;
}

.submit-query-btn {
  display: inline-block;
  float: left;
  margin-right: 40px;
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
