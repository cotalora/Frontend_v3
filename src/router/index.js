import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import organizations from '../views/organizations.vue'
import Histories from '../views/Histories.vue'
import Tickets from '../views/Tickets.vue'
import register from '../views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: organizations
  },
  {
    path: '/histories',
    name: 'Histories',
    component: Histories
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
