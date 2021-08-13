<template>
  <div class="container"> 
    <h2 class="container__title mt-sm">Seleccione Origen y Destino</h2>
    <form class="container__form">
      <cool-select
        v-model="origin"
        :items="nameLocations"
      />
      <cool-select
        v-model="destiny"
        :items="nameLocations"
      />
      <button class="container__button" @click.prevent="routeLocation(origin, destiny)">
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

// const directionsService = new google.maps.DirectionsService()
// const directionsDisplay = new google.maps.DirectionsRenderer()


export default {
  name: 'RouteLocation',
  components: {
    CoolSelect
  },
  data() {
    return {
      forestLocations: [],
      nameLocations: [],
      mergedLocations: [],
      origin: null,
      destiny: null,
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
      this.forestLocations = data.data.records
      this.nameLocations = this.forestLocations.map(lct => lct.fields.name)
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
        // const marker = new google.maps.Marker({
        //   position,
        //   map,
        // })
      }).catch(err => console.log(err))
    },

    routeLocation(origin, destiny) {
      if(!origin || !destiny){
        alert('ingrese ubicacion')
      }
      
      const filteredOrigin = this.forestLocations.filter(lct => lct.fields.name === this.origin)
      const filteredDestiny = this.forestLocations.filter(lct => lct.fields.name === this.destiny)  
      const {geoX: geoXOrigin, geoY: geoYOrigin} = filteredOrigin[0].fields
      const {geoX: geoXDestiny, geoY: geoYDestiny} = filteredDestiny[0].fields
      const originLocation = {
        lat: geoXOrigin,
        lng: geoYOrigin
      }
      const destinyLocation = {
        lat: geoXDestiny,
        lng: geoYDestiny
      }
      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_APIKEY,
        version: 'weekly',
      })
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: originLocation,
          zoom: 12
        })
        directionsDisplay.setMap(map);
        google.maps.event.addListenerOnce(map, 'idle', () => {
          document.getElementById('map').classList.add('show-map');
          this.calculateRoute(originLocation, destinyLocation);
        })
      }).catch(err => console.log(err))
    },

    calculateRoute(origin, destination) {
      directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    })
    },

    async getLocation() {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
        //this.initMap(position.coords.latitude ,position.coords.longitude)
        this.initMap(-37.46539873549036 ,-72.35412767333017)
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