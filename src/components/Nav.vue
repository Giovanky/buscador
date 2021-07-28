<template>
  <div id="nav" class="nav">
    <router-link class="nav-button" to="/">Portada</router-link> 
    <router-link class="nav-button" to="/locations">Mis Ubicaciones</router-link> 
    <router-link class="nav-button" to="/admin">Administrar</router-link> 
    <a class="nav-button" @click="logout">Cerrar Sesion</a>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Nav',
  methods: {
    async logout() {
      await firebase.auth().signOut()
      this.$router.replace('login')
    }
  }
}
</script>