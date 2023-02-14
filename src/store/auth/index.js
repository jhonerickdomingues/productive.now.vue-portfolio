import AuthService from '@/services/AuthService'
import router from '@/router'

/* helper */
import { getError } from "@/helpers/errors"

export default {
  namespaced: true,
  state: {
    status: null,
    token: localStorage.getItem('access_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
    checkTime: null
  },
  getters: {
    isLoggedIn: state => !!state.token,
    user: state => state.user,
    error: state => state.error,
    checkTime: state => state.checkTime
  },
  actions: {
    async loginStore ({ commit, dispatch }, user) {
      try {
        loader.show()
        const response = await AuthService.login(user)
        const { data } = response
        if (data.user.status != 'ACTIVE') throw { response: { data: { message: 'Usuário inativo' } } }
        if (data.user.role != 'admin') throw { response: { data: { message: 'Login não permitido' } } }
        await commit('auth_success', response.data)

        /* deixamos alguns Service.index que se repetem muito no vuex */
        // dispatch('admin/getRoles', null, { root: true })
        // dispatch('admin/getServices', null, { root: true })

        // redirecionamos para home
        return router.push('/calendar')
      } catch (error) {
        const msg = (error.response.data.message || error.response.data.errors[0].message) || 'Verifique se as credenciais estão corretas, caso o erro persista contate o suporte!'
        window.displayMessage('error', 'Erro ao logar!', getError(msg))
      } finally {
        loader.hide()
      }
    },
    check ({ commit }) {
      AuthService.checkLogin().then(response => {
        if (response.data != true) {
          commit('auth_logout')
        } else {
          commit('check')
        }
      }).catch(function (err) {
        console.error(err)
        commit('auth_logout')
      })
    },
    udpateCheckTime ({ commit }) {
      commit('update_checktime')
    },
    async logout ({ commit, dispatch }) {
      // await AuthService.logout()
      dispatch('admin/clearStorage', null, { root: true })
      commit('auth_logout')
    }
  },
  mutations: {
    check () {
      //
    },
    auth_success (state, data) {
      localStorage.setItem('access_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      state.status = 'success'
      state.token = data.token
      state.user = data.user
    },
    auth_error (state, msg) {
      localStorage.removeItem('access_token')
      state.token = null
      state.status = 'error'
      state.error = msg
    },
    auth_logout (state) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      state.token = null
      state.user = null
      state.status = 'logout'
      router.push('/login')
    },
    update_checktime (state) {
      const fiveMinutes = new Date().getTime() + (1000 * 60 * 5)
      state.checkTime = fiveMinutes
    }
  }
}
