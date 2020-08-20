import Vue from 'vue'
import VueRouter from 'vue-router'
import products from '../views/product.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'product',
    component: products
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
