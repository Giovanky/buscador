<template>
  <div>
      <h1>Geocoding api</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Geocoding',
    data() {
        return {

        }
    },
    methods: {
        async httpCall() {
            const data = await axios(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: 'Caldera, Chile',
                    key: process.env.VUE_APP_GOOGLE_APIKEY
                }
            }).catch(err => console.log(err))  
                
            console.log(data)
        }
    },
    mounted() {
        this.httpCall()
    }
}
</script>

<style>

</style>