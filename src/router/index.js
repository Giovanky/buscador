import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Locations from '../views/Locations.vue'
import Admin from '../views/Admin.vue'
import RouteLocation from '@/views/RouteView.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/route',
    name: 'RouteLocation',
    component: RouteLocation,
    meta: {
      auth: true
    }
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      auth: true,
      admin: true 
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  // console.log(user)
  let auth = to.matched.some(record => record.meta.auth)

  if(auth && !user){
    next('login')
  }else if(!auth && user){
    next('home')
  }else{
    next()
  }
})

export default router