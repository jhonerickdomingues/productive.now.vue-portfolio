// services
import UsersService from '@/services/UsersService'

export default {
  namespaced: true,
  state: {
    users: [],
    userForm: {
      show: false,
      user: {}
    }
  },
  getters: {
    users (state) {
      return state.users
    }
  },
  actions: {
    async getUsers ({ commit }, loader = true) {
      try {
        if (loader) window.loader.show()
        const { data } = await UsersService.index()
        commit('UPDATE_USERS', data)
      } finally {
        if (loader) window.loader.hide()
      }
    }
  },
  mutations: {
    UPDATE_USERS (state, data) {
      state.users = data
    }
  }
}
