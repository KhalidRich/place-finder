<template>
  <div class="places">
    <h1> Add New Place </h1>
    <div class="form">
      <div>
        <input type="text" name="name" placeholder="Place Name" v-model="name">
      </div>
      <div>
        <input type="text" name="google_place_id" placeholder="Google Places ID" v-model="google_place_id">
      </div>
      <div>
        <button class="app_post_btn" @click="addPlace">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'
export default {
  name: 'NewPost',
  data() {
    return {
      name: '',
      google_place_id: ''
    }
  },
  methods: {
    async addPlace() {
      await PlacesService.addPlace({
        name: this.name,
        google_place_id: this.google_place_id
      })
      this.$router.push({ name: 'Places' })
    }
  }
}
