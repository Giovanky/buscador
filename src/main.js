import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.devtools = true

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FBKEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDERID,
  appId: process.env.VUE_APP_APPID
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(function(user){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})