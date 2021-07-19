<template>
  <form class="form">
      <input type="text" class="input" v-model="user" name="user" placeholder="Ingrese Usuario">
      <input type="text" class="input" v-model="password" name="password" placeholder="Ingrese Contraseña">
      <button class="button" @click.prevent="login">
          Ingresar
      </button>
  </form>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data() {
        return {
            user: '',
            password: ''
        }
    },
    methods: {
        async login() {
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

<style scoped>
    .form{
        height: 26rem;
        width: 18 rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* .form > * {
        display: block;
    } */

    .input{
        font-size: 1.2rem;
        padding: .6rem 1.2rem;
        border-radius: 4px;
        border: 1.08px solid #333;
        outline: none;
        margin: .8rem 1.6rem;
        transition: border .2s;
        color: #2c3e50;
        width: 26vw;
    }

    .input:focus{
        border: 1.083px solid #42b983;
    }

    .button{
        padding: .8rem 2.4rem;
        border-radius: 3px;
        outline: none;
        font-size: 1.6rem;
        color: #fff;
        font-family: Arial;
        font-weight: bold;
        background-color: #42b983;
        border: none;
    }

    .button:hover{
        background-color: #359c6e;
    }
</style>