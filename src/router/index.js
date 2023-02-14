import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'

Vue.use(Router)

// const user = store.getters['auth/user']

const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/Login'),
      meta: {
        layout: 'full',
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/Auth/ResetPassword'),
      meta: {
        layout: 'full',
      }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home')
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('@/views/Services')
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users/UsersList'),
        children: [
          {
            name: 'users.new',
            path: 'new',
            component: () => import('@/views/Users/UsersNew')
          },
          {
            name: 'users.edit',
            path: ':id/edit',
            component: () => import('@/views/Users/UsersEdit'),
            props: true
          }
        ]
    },
    {
        name: 'customers',
        path: '/customers',
        component: () => import('@/views/Customers/CustomersList'),
        children: [
          {
            name: 'customers.new',
            path: 'new',
            component: () => import('@/views/Customers/CustomersNew')
          },
          {
            name: 'customers.edit',
            path: ':id/edit',
            component: () => import('@/views/Customers/CustomersEdit'),
            props: true
          }
        ]
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('@/views/Calendar/CalendarView')
    },
    {
        path: '/forms',
        name: 'forms',
        component: () => import('@/views/Forms')
    },
]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
