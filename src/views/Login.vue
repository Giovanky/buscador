<template>
  <form class="container">
      <h1 class="container__title">Iniciar Sesion</h1>
      <p class="container__info">Nos encanta verte por aquí!</p>
      <input type="text" class="input" v-model="email" name="email" placeholder="Ingrese Usuario">
      <input type="text" class="input" v-model="password" name="password" placeholder="Ingrese Contraseña">
      <button class="button" @click.prevent="login">
        Entrar
      </button>
      <button class="button" @click.prevent="googleLogin">
        Iniciar con Google
      </button>
      <router-link to="/register" class="container__text" tag="p">No tienes una cuenta?</router-link>
  </form>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try{
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                this.$router.replace('home')
            }catch(err){
                console.log(err)
            } 
        },
        async googleLogin() {
            console.log('google')
        }
    }
}
</script>