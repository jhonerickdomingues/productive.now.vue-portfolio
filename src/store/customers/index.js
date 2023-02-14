// services
import CustomersService from '@/services/CustomersService'

export default {
  namespaced: true,
  state: {
    customersAll: [],
    customers: [],
    pagination: {
      total: null,
      perPage: 50,
      page: 1
    },
    customerForm: {
      show: false,
      customer: {}
    }
  },
  getters: {
    customers: state => state.customers
  },
  actions: {
    async newCustomer ({ commit }) {
      commit('NEW_CUSTOMER')
    },
    async edit ({ commit }, customer) {
      commit('EDIT_CUSTOMER', customer)
    },
    async close ({ commit }) {
      commit('CLOSE')
    },
    async getCustomersAll ({ commit }) {
      const { data } = await CustomersService.all()
      commit('UPDATE_CUSTOMERS_ALL', data)
    },
    async getCustomers ({ commit }, params, loader = true) {
      try {
        loader && window.loader.show()
        const { data } = await CustomersService.index(params)
        commit('UPDATE_CUSTOMERS', data)
      } finally {
        loader && window.loader.hide()
      }
    },
    async saveCustomer ({ dispatch }, customer) {
      await CustomersService.store(customer)
      dispatch('getCustomers')
      dispatch('close')
      window.toast({
        title: `Serviço cadastrado!`,
        description: `nome: ${ customer.name }`,
        variant: 'success'
      })
    },
    async updateCustomer ({ dispatch }, customer) {
      await CustomersService.update(customer._id, customer)
      dispatch('getCustomers')
      dispatch('close')
      window.toast({
        title: `Serviço Atualizado!`,
        description: `nome: ${ customer.name }`,
        variant: 'success'
      })
    },
    async deleteCustomer ({ dispatch }, customer) {
      const status = await window.displayMessage('question', 'Atenção', `Excluir o cliente: "${ customer.name }?"`)
      if (status.isConfirmed) {
        await CustomersService.delete(customer._id)
        dispatch('getCustomers')
        window.toast({
          title: `Serviço excluido!`,
          description: `nome: ${ customer.name }`,
          variant: 'success'
        })
      }
    }
  },
  mutations: {
    UPDATE_CUSTOMERS_ALL (state, data) {
      state.customersAll = data
    },
    UPDATE_CUSTOMERS (state, data) {
      const { page, perPage, total } = data
      state.customers = data.data
      state.pagination = {page, perPage, total}
    },
    NEW_CUSTOMER (state) {
      state.customerForm.show = true
    },
    EDIT_CUSTOMER (state, customer) {
      state.customerForm.show = true
      state.customerForm.customer = customer
    },
    CLOSE (state) {
      state.customerForm.show = false
      state.customerForm.customer = {}
    }
  }
}
