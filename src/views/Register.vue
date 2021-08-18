<template>
    <form class="form">
        <h1 class="form__title">Registrarse</h1>
        <p class="form__info">Acompañanos y descubre todo lo que tenemos para tí!</p>
        <input type="text" class="input" v-model="user" name="user" placeholder="Ingrese Usuario">
        <input type="text" class="input" v-model="password" name="password" placeholder="Ingrese Contraseña">
        <button class="button" @click.prevent="register">
        Registrarse
        </button>
        <router-link to="/login" class="form__text" tag="p">Quieres iniciar sesion?</router-link>
    </form>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        async register() {
            try{
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                        //hacer algo con el user .v
                        this.$router.replace('home')
                    }).catch(err => console.log(err))
            }catch(err){
                console.log(err)
            } 
        }
    }
}
</script>