// services
import ServiceOrderService from '@/services/ServiceOrderService'

/* helper */
import { getError } from "@/helpers/errors"
import moment from 'moment'
import {STATUS_TASKS_OBJ} from '@/constants/tasks'

const task = {
  service: '',
  description: '',
  start: moment(new Date).format('YYYY-MM-DD'),
  end: moment(new Date).format('YYYY-MM-DD'),
  taskUsers: [],
  visible: true,
  status: 'WAITING'
}

export default {
  namespaced: true,
  state: {
    orders: [],
    params: {},
    orderForm: {
      show: false,
      task: null,
      date: null,
    }
  },
  getters: {
    orders: state => state.orders
  },
  actions: {
    updateDate ({ commit }, date) {
      commit('UPDATE_DATE', date)
    },
    addTask ({ commit }, date = {}) {
      commit('ADD_TASK', date)
    },
    editTask ({ commit }, { task, date }) {
      commit('EDIT_TASK', { task, date })
    },
    closeTask ({ commit }) {
      commit('CLOSE_TASK')
    },
    async getTasks ({ commit, state }, params) {
      try {
        loader.show()
        if (params && Object.keys(params).length > 0) {
          commit('SET_PARAMS', { ...state.params, ...params })
        }
        const { data } = await ServiceOrderService.index(state.params)
        commit('UPDATE_TASKS', data)
      } catch (error) {
        console.log(error)
        const msg = (error.response.data.message || error.response.data.errors[0].message) || 'Verifique se as credenciais estão corretas, caso o erro persista contate o suporte!'
        window.displayMessage('error', 'Erro ao buscar tarefas!', getError(msg))
      } finally {
        loader.hide()
      }
    },
    async saveEvent ({ dispatch }, data) {
      try {
        loader.show()
        await ServiceOrderService.store(data)
        dispatch('getTasks')
        dispatch('closeTask')
      } finally {
        loader.hide()
      }
    },
    async updateEvent ({ dispatch }, data) {
      try {
        const status = await window.displayMessage('question', 'Atenção', `Deseja atualizar a ordem de serviço "${ data.code }"?`)
        if (status.isConfirmed) {
          loader.show()
          await ServiceOrderService.update(data._id, data)
          dispatch('getTasks')
          dispatch('closeTask')
        }
      } finally {
        loader.hide()
      }
    },
    async deleteEvent ({ dispatch }, data) {
      const status = await window.displayMessage('question', 'Atenção', `A ordem de serviço "${ data.code }" e suas tarefas serão excluidas. Deseja prosseguir?`)

      if (status.isConfirmed) {
        try {
          loader.show()
          await ServiceOrderService.delete(data._id)
          dispatch('getTasks')
          dispatch('closeTask')
        } finally {
          loader.hide()
        }
      }
    }
  },
  mutations: {
    UPDATE_TASKS (state, data) {
      const orders = []

      data.forEach(serviceOrder => {
        serviceOrder.tasks.forEach(task => {
          orders.push({
            id: task._id,
            url: '',
            title: `${serviceOrder.code}`,
            start: `${task.startDate}${task.startTime ? ' ' + task.startTime : ''}`,
            end: `${task.endDate}${task.endTime ? ' ' + task.endTime : ''}`,
            allDay: false,
            status: task.status,
            extendedProps: {
              statusColor: STATUS_TASKS_OBJ[task.status].color,
              customer: serviceOrder.customer,
              service: task.service.name,
              serviceOrder: serviceOrder,
              taskUsers: task.taskUsers,
              imageUser: task.taskUsers.find(user => user.leader)?.user?.image,
            },
          })
        })
      })

      state.orders = orders
    },
    ADD_TASK (state, { start }) {
      state.orderForm.show = true
      state.orderForm.task = task

      if (start) {
        state.orderForm.task = {
          tasks: [
            {
              ...task,
              startDate: start,
              endDate: start
            }
          ]
        }
      }
    },
    EDIT_TASK (state, { task, date }) {
      state.orderForm.show = true
      state.orderForm.task = task
      state.orderForm.date = date
    },
    CLOSE_TASK (state) {
      state.orderForm.show = false
      state.orderForm.task = null
      state.orderForm.date = null
    },
    SET_PARAMS (state, params) {
      state.params = { ...params }
    },
    UPDATE_DATE (state, date) {
      state.orderForm.date = date
    }
  }
}
