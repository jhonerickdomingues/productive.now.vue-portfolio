'use strict'

import axios from "axios"
import store from '@/store'

axios.interceptors.request.use(function (config) {
  // loader.show()
  // objSwal.error.title = `Erro!"`
  // objSwal.error.html = `Erro ao carregar <b>${ config.url }</b>`

  /*const user = app.$store.getters['auth/user']

  if (config.headers.userType && !!user) {
    const index = Object.values(config.headers.userType).indexOf(user.role)
    if (index !== -1) {
      return config
    } else {
      objSwal.error.text = "Permissão requisitada"
      delete objSwal.error.html
      Swal.fire(objSwal.error)
      objSwal.error.text = null
      throw `requisição não permitida: ${ config.url }`
    }
  }*/

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // loader.hide()
  objSwal.error.title = null
  delete objSwal.error.html
  return response
}, function (error) {
  // loader.hide()
 /* if (!!objSwal.error.title.match('api/check') && !!objSwal.error.title.match('api/me')) {
    Swal.fire(objSwal.error)
    delete objSwal.error.html
  }*/
  return Promise.reject(error)
})

class BaseService {
  static sendData (url, data, config) {
    return axios.post(url, data, config)
  }

  static updateData (url, data, config) {
    return axios.put(url, data, config)
  }

  static destroyData (url, config) {
    return axios.delete(url, config)
  }

  static getData (url, config) {
    return axios.get(url, config)
  }

  static getHeaders (token) {
    return {
      Authorization: token,
      'x-tenant-id': store.getters['auth/user'].tenant
    }
  }
}

export default BaseService
