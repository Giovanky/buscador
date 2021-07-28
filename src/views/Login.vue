<template>
  <form class="form">
      <h1 class="form__title">Iniciar Sesion</h1>
      <p class="form__info">Nos encanta verte por aquí!</p>
      <input type="text" class="input" v-model="email" name="email" placeholder="Ingrese Usuario">
      <input type="text" class="input" v-model="password" name="password" placeholder="Ingrese Contraseña">
      <button class="button" @click.prevent="login">
        Entrar
      </button>
      <button class="button" @click.prevent="googleLogin">
        Iniciar con Google
      </button>
      <router-link to="/register" class="form__text" tag="p">No tienes una cuenta?</router-link>
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
            try{
                const provider = new firebase.auth.GoogleAuthProvider()
                firebase.auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        var credential = result.credential;
                        var token = credential.accessToken;
                        var user = result.user;
                        this.$router.replace('home')
                    }).catch((err) => {
                        console.log(err)
                    })
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>