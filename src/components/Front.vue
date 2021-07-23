<template>
  <div class="container"> 
    <h1 class="title">Geosearch</h1>
    <form class="form">
      <select v-model="search" class="select" name="search" required>
        <option :value="record.fields.id" v-for="record of allRecords" :key="record._id">{{record.fields.name}}</option>
      </select>
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
      allRecords: [],
      search: '',
    }
  },
  computed: {

  },
  methods: {
    async doHttpCall() {
      const data = await axios(`${process.env.VUE_APP_URL}/ubication`, {
        headers: {
          'Authorization': `Bearer ${process.env.VUE_APP_APYKEY}`
        }
      }).catch(err => console.log(err))
      this.allRecords = data.data.records
      // satanizando sort() :v
      // data.data.records.map(el => console.log(el.fields.name))
    },

    async initMap() {
      const position = { lat: -27.071845, lng: -70.824434 }

      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_APIKEY,
        version: 'weekly',
        // ...additionalOptions,
      })
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: position,
          zoom: 17,
        })

        const marker = new google.maps.Marker({
          position,
          map,
        })
      }).catch(err => console.log(err))
      
    }
  },
  mounted() {
    this.doHttpCall()
    this.initMap()
  }
}
</script>