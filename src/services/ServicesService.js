'use strict'

import BaseService from '@/services/BaseService'
import api_acesso from '@/config/api_acesso'

export default class ServicesService extends BaseService {
  static index () {
    const endpoint = api_acesso.url + `/services`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.getData(endpoint, config)
  }

  static show (id) {
    const endpoint = api_acesso.url + `/services/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.getData(endpoint, config)
  }

  static store (customer) {
    const endpoint = api_acesso.url + `/services`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.sendData(endpoint, customer, config)
  }

  static update (id, customer) {
    const endpoint = api_acesso.url + `/services/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.updateData(endpoint, customer, config)
  }

  static delete (id) {
    const endpoint = api_acesso.url + `/services/${id}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.destroyData(endpoint, config)
  }

  static all () {
    const endpoint = api_acesso.url + `/services/all`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    }

    return this.getData(endpoint, config)
  }
}
