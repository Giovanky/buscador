<template>
  <form class="container">
      <h1 class="container__title">Registrarse</h1>
      <p class="container__info">Acompañanos y descubre todo lo que tenemos para tí!</p>
      <input type="text" class="input" v-model="user" name="user" placeholder="Ingrese Usuario">
      <input type="text" class="input" v-model="password" name="password" placeholder="Ingrese Contraseña">
      <button class="button" @click.prevent="register">
        Registrarse
      </button>
      <router-link to="/login" class="container__text" tag="p">Quieres iniciar sesion?</router-link>
  </form>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Register',
    data() {
        return {
            user: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        async register() {
            try{
                const user = await firebase.auth().signInWithEmailAndPassword(this.user, this.password)
                this.$router.replace('home')

            }catch(err){
                console.log(err)
            } 
        }
    }
}
</script>