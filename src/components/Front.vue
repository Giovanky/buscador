<template>
  <div class="container"> 
    <h2 class="container__title mt-sm">Seleccione Ubicacion</h2>
    <form class="container__form">
      <cool-select
        v-model="selected"
        :items="nameLocations"
      />
      <button class="container__button" @click.prevent="searchLocation(selected)">
        Buscar
      </button>
    </form>

    <div class="map" id="map">
      
    </div>
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'
import axios from 'axios'
import { Loader } from '@googlemaps/js-api-loader'

export default {
  name: 'Front',
  components: {
    CoolSelect
  },
  data() {
    return {
      allLocations: [],
      nameLocations: [],
      selected: null
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
      this.nameLocations = this.allLocations.map(lct => lct.fields.name)
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
      if(!location){
        console.log('ingrese ubicacion')
      }
      const filteredLocation = this.allLocations.filter(lct => lct.fields.name === this.selected)
      this.initMap(filteredLocation[0].fields.geoX, filteredLocation[0].fields.geoY)
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