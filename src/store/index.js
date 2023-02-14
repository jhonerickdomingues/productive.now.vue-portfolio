import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import admin from './admin'
import orders from './order-service'
import customers from './customers'
import services from './services'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    admin,
    orders,
    customers,
    services,
    users,
  },
  strict: process.env.DEV,
})
