<template>
  <div class="container"> 
    <h1 class="title">Geosearch</h1>
    <form class="form">
      <input class="input" type="text" v-model="search" placeholder="Nombre Ubicación">
    </form>

    <div id="map">
      
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
    },

    async initMap() {
      const position = { lat: -27.071845, lng: -70.824434 }

      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_APIKEY,
        version: 'weekly',
        // ...additionalOptions,
      })
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
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

<style>
  html, body{
    padding: 0;
    margin: 0;
  }

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .title{
    width: 100%;
  }

  .input{
    font-size: 1.2rem;
    padding: .6rem 1.2rem;
    border-radius: 4px;
    border: 1.08px solid #333;
    outline: none;
    margin: .8rem 1.6rem;
    transition: border .2s;
    color: #2c3e50;
    width: 50vw;
  }

  .input:focus{
    border: 1.083px solid #42b983;
  }

  .ulist{
    list-style: none;
    font-size: 1.4rem;
    display: block;
  }

  #map{
    position: absolute;
    top: 10rem;
    z-index: 1;
    height: 40rem;
    width: 80%;
    border-radius: 3px;
    box-shadow: -12px 12px 12px 0px #3333;
  }
</style>