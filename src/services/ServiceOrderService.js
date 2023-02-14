'use strict'

import BaseService from '@/services/BaseService'
import api_acesso from '@/config/api_acesso'

export default class ServiceOrderService extends BaseService {
  static getPayload (orderService) {
    const { code, customer, tasks, _id, tasksDelete } = orderService
    const tokensMobile = []
    return {
      _id,
      code,
      customer: customer._id || customer,
      tasksDelete,
      tasks: tasks.map(task => {
        const { service, description, startDate, startTime, endDate, endTime, end, taskUsers, deletedUsers, _id, status } = task
        return {
          service: service._id || service,
          description,
          startDate,
          startTime,
          endDate,
          endTime,
          end,
          _id,
          status,
          taskUsers: taskUsers.map(userObj => {
            const { leader, user: { _id, mobile } } = userObj
            if (mobile && tokensMobile.indexOf(mobile) == -1) tokensMobile.push(mobile)
            return {
              _id: userObj._id,
              user: _id,
              leader
            }
          }),
          deletedUsers,
        }
      }),
      tokensMobile
    }
  }

  static index (params) {
    const endpoint = api_acesso.url + `/service-order`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
      params: params
    }

    return this.getData(endpoint, config)
  }

  static store (data) {
    const payload = this.getPayload(data)

    if (payload.tasks.length == 0) {
      throw 'sem nenhuma task cadastrada'
    }

    const endpoint = api_acesso.url + `/service-order`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
    }

    return this.sendData(endpoint, payload, config)
  }

  static update (id, data) {
    const payload = this.getPayload(data)

    const endpoint = api_acesso.url + `/service-order/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
    }

    return this.updateData(endpoint, payload, config)
  }

  static delete (id) {
    const endpoint = api_acesso.url + `/service-order/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
    }

    return this.destroyData(endpoint, config)
  }
}
