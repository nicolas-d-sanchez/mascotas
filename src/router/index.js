import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },  
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/productos/Alimentos',
    name: 'Alimentos',
    component: () => import(/* webpackChunkName: "about" */ '../components/Alimentos.vue')
  },
  {
    path: '/productos/Juguetes',
    name: 'Juguetes',
    component: () => import(/* webpackChunkName: "about" */ '../components/Juguetes.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
