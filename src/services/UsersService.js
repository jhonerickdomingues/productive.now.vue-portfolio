'use strict'

import BaseService from '@/services/BaseService'
import api_acesso from '@/config/api_acesso'

export default class UsersService extends BaseService {
  static index (params) {
    const endpoint = api_acesso.url + `/users`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
      params: params
    }

    return this.getData(endpoint, config)
  }

  static show (id) {
    const endpoint = api_acesso.url + `/users/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.getData(endpoint, config)
  }

  static store (customer) {
    let form = new FormData()

    Object.keys(customer).forEach((key) => {
      if (!this.isAuthorized(key)) return
      if (key != 'file') {
        form.append(key, customer[key])
      } else {
        form.append(key, customer[key][0], customer[key][0].name)
      }
    })

    const endpoint = api_acesso.url + `/users`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.sendData(endpoint, form, config)
  }

  static isAuthorized = (field) => {
    return ['_id', 'name', 'login', 'password', 'role', 'mail', 'status', 'image', 'file'].indexOf(field) > -1
  }

  static update (id, customer) {
    let form = new FormData()

    Object.keys(customer).forEach((key) => {
      if (!this.isAuthorized(key)) return
      if (key != 'file') {
        form.append(key, customer[key])
      } else {
        form.append(key, customer[key][0], customer[key][0].name)
      }
    })

    const endpoint = api_acesso.url + `/users/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.updateData(endpoint, form, config)
  }

  static delete (id) {
    const endpoint = api_acesso.url + `/users/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.destroyData(endpoint, config)
  }
}
