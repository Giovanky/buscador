<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <button class="button" @click="logout">Cerrar Sesion</button>
    </div>
    <Front />
  </div>
</template>

<script>
import firebase from 'firebase'
import Front from '@/components/Front.vue'
import Geocoding from '@/components/Geocoding.vue'

export default {
  name: 'Home',
  components: {
    Front,
    Geocoding
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
      this.$router.replace('login')
    }
  }
}
</script>
