import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import { IconsPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import store from './store'
import App from './App.vue'
import vSelect from 'vue-select'
import VeeValidate from 'vee-validate'
import dictionary from './utils/dictionary'
import VueMask from 'v-mask'
import { validObj } from '@/helpers/functions'


Vue.use(VeeValidate, {
    locale: 'pt',
    inject: true,
    fieldsBagName: 'veeFields',
    dictionary
})

/* filters */
import { mask, inverterData } from '@/utils/filters'

Vue.filter('mask', mask)
Vue.filter('invertDate', inverterData)

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import Loading from 'vue-loading-overlay'

// BSV Plugin Registration
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// mask
Vue.use(VueMask)


// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false
Vue.use(Loading)
Vue.component('v-select', vSelect)


import money from 'v-money'
Vue.use(money, {precision: 4})


import Swal from 'sweetalert2'
import objSwal from '@/constants/swalValues'
window.Swal = Swal
window.objSwal = objSwal

window.loader = {
    show: () => {
        const state = Vue.$loading.show({ color: '#007bff' })
        loader.states.push(state)
    },
    hide: () => {
        const index = loader.states.length - 1
        loader.states[index].hide()
        loader.states.pop()
    },
    states: []
}

window.toast = ({ description, title, variant }) => {
  app.$bvToast.toast(description, {
    title,
    variant,
    solid: true,
    autoHideDelay: 5000
  })
}

window.getErrors = (error) => {
    let message

    if (validObj(error, ['response', 'data', 'message', 'errors'])) {
        message = JSON.stringify(error.response.data.message.errors)
    } else if (validObj(error, ['response', 'data', 'message'])) {
        message = error.response.data.message
    } else if (validObj(error, ['response', 'data'])) {
        message = error.response.data
    } else if (validObj(error, ['response'])) {
        message = error.response
    }  else if (validObj(error, ['message'])) {
        message = error.message
    } else {
        message = error
    }

    return {
        message,
        status: error.status || 400
    }
}

window.displayMessage = (type, title, text, options = null) => {
    objSwal[type].title = title
    objSwal[type].text = text

    if (!!options) {
        Object.assign(objSwal[type], options)
    }

    return Swal.fire(objSwal[type]).then((res) => {
        objSwal[type].title = null
        objSwal[type].text = null

        return res
    })
}

window.inverterData = (data) => {
    if (!data) return null

    const search1 = data.search('/')
    const search2 = data.search('-')

    if (search1 > -1) {
        return data.split('/').reverse().join('/').replace(/([/])/g, '-')
    }

    if (search2 > -1) {
        return data.split('-').reverse().join('-').replace(/([-])/g, '/')
    }
}

window.app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
