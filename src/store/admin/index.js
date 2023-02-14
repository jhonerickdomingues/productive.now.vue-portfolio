/* services */
// import RoleService from '@/services/User/Roles/RoleService'
// import ServiceService from '@/services/User/ServiceService' // TODO: rever nomenclatura
// import ModuleService from '@/services/User/ModuleService' // TODO: rever nomenclatura

export default {
  namespaced: true,
  state: {
    roles: [{ name: 'Admin', _id: 'admin' }, { name: 'Lider', _id: 'leader' }, { name: 'Técnico', _id: 'guest' }],
    error: null
  },
  getters: {
    roles: state => state.roles,
    services: state => state.services,
    error: state => state.error
  },
  actions: {
    async clearStorage ({ commit }) {
      commit('clear_storage')
    },
  },
  mutations: {
    clear_storage (state) {
      localStorage.removeItem('admin.roles')
      localStorage.removeItem('admin.services')
      state.roles = null
      state.services = null
    },
    update_roles (state, roles) {
      localStorage.setItem('admin.roles', JSON.stringify(roles))
      state.roles = roles
    },
    update_services (state, services) {
      localStorage.setItem('admin.services', JSON.stringify(services))
      state.services = services
    }
  }
}
