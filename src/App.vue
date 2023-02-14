<template>
  <div
    id="app"
    class="h-100"
    :class="[skinClasses]">
    <component :is="layout">
      <router-view v-show="loaded" />
    </component>
    <ServicesForm />
    <CustomersForm />
  </div>
</template>

<script>

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'

const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

// components
import ServicesForm from '@/components/Services/ServicesForm'
import CustomersForm from '@/components/Customers/CustomersForm'

export default {
  components: {
    // Layouts
    LayoutVertical,
    LayoutFull,
    // components
    ServicesForm,
    CustomersForm,
  },
  data () {
    return {
      loaded: false,
    }
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout () {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType () {
      return this.$store.state.appConfig.layout.type
    },
  },
  watch: {
    $route () {
      this.loaded = false
      this.check()
    }
  },
  created () {
    this.check()
  },
  beforeCreate () {

    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },
  setup () {
    const { skin, skinClasses } = useAppConfig()

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    return {
      skinClasses,
    }
  },
  methods: {
    check () {
      try {
        const lastTimeChecked = this.$store.getters['auth/checkTime']
        let toCheck = true
        const nowTime = new Date().getTime()

        if (lastTimeChecked) {
          toCheck = nowTime >= lastTimeChecked
        }

        if (window.location.pathname != '/login' && !window.location.pathname.match('/reset-password') && toCheck) {
          this.loaded = false
          this.$store.dispatch('auth/check')
          this.$store.dispatch('auth/udpateCheckTime')
        }
      } catch (e) {
        this.$store.dispatch('auth/logout')
      } finally {
        this.loaded = true
      }
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
