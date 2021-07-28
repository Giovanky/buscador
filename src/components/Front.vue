<template>
  <div class="container"> 
    <h2 class="container__title mt-sm">Seleccione Ubicacion</h2>
    <form class="container__form">
      <select v-model="search" class="container__select" name="search" required>
        <option :value="location.fields" v-for="location of allLocations" :key="location._id">{{location.fields.name}}</option>
      </select>
      <button class="container__button" @click.prevent="searchLocation(search)">
        Buscar
      </button>
    </form>

    <div class="map" id="map">
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loader } from '@googlemaps/js-api-loader'

export default {
  name: 'Front',
  data() {
    return {
      allLocations: [],
      search: '',
    }
  },
  computed: {

  },
  methods: {
    async getApiLocations() {
      const data = await axios(`${process.env.VUE_APP_URL}/ubication`, {
        headers: {
          'Authorization': `Bearer ${process.env.VUE_APP_APYKEY}`
        }
      }).catch(err => console.log(err))
      this.allLocations = data.data.records
      // satanizando sort() :v
      // data.data.records.map(el => console.log(el.fields.name))
    },

    async initMap(lat, lng) {
      const position = {lat, lng}
      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_APIKEY,
        version: 'weekly',
      })
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: position,
          zoom: 15,
        })
        const marker = new google.maps.Marker({
          position,
          map,
        })
      }).catch(err => console.log(err))
    },

    searchLocation(location) {
      if(location){
        this.initMap(location.geoX, location.geoY)
      }else{
        console.log('seleccione ubicacion')
      }
    },

    async getLocation() {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          this.initMap(position.coords.latitude ,position.coords.longitude)
        }, err => console.log(err), {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
      }else{
        console.log('El navegador no soporta geolocalizacion')
      }
    }
  },
  mounted() {
    this.getLocation()
    this.getApiLocations()
  }
}
</script>