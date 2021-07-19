import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.devtools = true


const firebaseConfig = {
  apiKey: 'AIzaSyBS2GYJ00RdYX00Y1KWT9gV3eOTpvB9SYo',
  authDomain: 'geosearch-e8050.firebaseapp.com',
  projectId: 'geosearch-e8050',
  storageBucket: 'geosearch-e8050.appspot.com',
  messagingSenderId: '1084270915725',
  appId: '1:1084270915725:web:a21cd02bba7225203772c4'
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(function(user){
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

