// services
import ServicesService from '@/services/ServicesService'

export default {
  namespaced: true,
  state: {
    services: [],
    serviceForm: {
      show: false,
      service: {}
    }
  },
  getters: {
    services: state => state.services
  },
  actions: {
    async getServices ({ commit }, loader = true) {
      if (loader) window.loader.show()
      const { data } = await ServicesService.index()
      commit('UPDATE_SERVICES', data)
      if (loader) window.loader.hide()
    },
    async saveService ({ dispatch }, service) {
      await ServicesService.store(service)
      dispatch('getServices')
      dispatch('close')
      window.toast({
        title: `Serviço cadastrado!`,
        description: `nome: ${ service.name }`,
        variant: 'success'
      })
    },
    async updateService ({ dispatch }, service) {
      await ServicesService.update(service._id, service)
      dispatch('getServices')
      dispatch('close')
      window.toast({
        title: `Serviço Atualizado!`,
        description: `nome: ${ service.name }`,
        variant: 'success'
      })
    },
    async newService ({ commit }) {
      commit('NEW_SERVICE')
    },
    async edit ({ commit }, service) {
      commit('EDIT_SERVICE', service)
    },
    async close ({ commit }) {
      commit('CLOSE')
    },
    async deleteService ({ dispatch }, service) {
      const status = await window.displayMessage('question', 'Atenção', `Excluir o serviço: "${ service.name }?"`)
      if (status.isConfirmed) {
        await ServicesService.delete(service._id)
        dispatch('getServices')
        window.toast({
          title: `Serviço excluido!`,
          description: `nome: ${ service.name }`,
          variant: 'success'
        })
      }
    }
  },
  mutations: {
    UPDATE_SERVICES (state, data) {
      state.services = data
    },
    NEW_SERVICE (state) {
      state.serviceForm.show = true
    },
    EDIT_SERVICE (state, service) {
      state.serviceForm.show = true
      state.serviceForm.service = service
    },
    CLOSE (state) {
      state.serviceForm.show = false
      state.serviceForm.service = {}
    }
  }
}
