import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Country from '../views/Country.vue'
import SecondCountry from '../views/SecondCountry.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:name',
    name: 'Country',
    props: true,
    component: Country
  },
  {
    path: '/:name',
    name: 'secondCountry',
    props: true,
    component: SecondCountry
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
