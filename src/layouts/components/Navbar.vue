<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive">
          <feather-icon
            icon="MenuIcon"
            size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user">
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ user && user.name }}
            </p>
            <span class="user-status">{{ user && user.role.name }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="user && user.image || require('@/assets/images/avatars/user.png')"
            class="badge-minimal"
            badge-variant="success" />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center" @click="$router.push({ name: 'change-password' })">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50" />
          <span>Alterar Senha</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center"
                         @click="logout()">
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'

/* libraries */
import { mapGetters } from 'vuex'

export default {
  components: {

    // Navbar Components
    DarkToggler,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      user: 'auth/user'
    })
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
}
</script>
