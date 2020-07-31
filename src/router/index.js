import Vue from 'vue'
import VueRouter from 'vue-router'
import mainpaged from '../views/mainpage.vue'
import scrapped from '../views/scrapped.vue'
import suppliers from '../views/supplier.vue'
import products from '../views/product.vue'
import memberships from '../views/membership.vue'
import transactions from '../views/transaction.vue'
import practiced from '../views/practice.vue'
import statements from '../views/statement.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'mainhome',
    component: mainpaged
  },
  {
    path: '/membershipview',
    name: 'membership',
    component: memberships
  },
  {
    path: '/productview',
    name: 'product',
    component: products
  },
  {
    path: '/supplierview',
    name: 'supplier',
    component: suppliers
  },
  {
    path: '/scrappview',
    name: 'scrapp',
    component: scrapped
  },
  {
    path: '/transactionview',
    name: 'transaction',
    component: transactions
  },
  {
    path: '/practiceview',
    name: 'practices',
    component: practiced
  },
  {
    path: '/statementview',
    name: 'statements',
    component: statements
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
