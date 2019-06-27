<template>
    <div class="places">
        This file will list all the places.

        <div v-for="place in places">
            <p>
                <span><b> {{ place.name }}</b></span>
                <span> {{ place.msg }} </span>
            </p>
        </div>
    </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'

export default {
  name: 'places',
  data () {
    return {
        places: []
    }
  },
  mounted() {
      return this.getPlaces()
  },
  methods: {
      async getPlaces() {
          const response = await PlacesService.fetchHelloMessage()
          this.places = response.data
      }
  }
}
</script>
