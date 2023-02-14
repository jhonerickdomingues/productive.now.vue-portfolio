'use strict'

import BaseService from './BaseService'
import api_acesso from '../config/api_acesso'

class AuthService extends BaseService {
  static login (data) {
    return this.sendData(api_acesso.url + `/auth/login`, {
      login: data.login,
      password: data.password
    })
  }

  static checkLogin () {
    return this.getData(api_acesso.url + `/auth/check`, {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    })
  }

  static logout () {
    return this.sendData(api_acesso.url + `/auth/logout`, null, {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    })
  }

  static changePassword (data) {
    return this.updateData(api_acesso.url + `/auth/change-password`, data, {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    })
  }

  static emailReset (data) {
    const payload = {
      email: data.email
    }

    return this.sendData(api_acesso.url + `/auth/reset-email`, payload,{
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    })
  }

  static verifyToken (token) {
    if (!token) throw "Informe o token"

    return this.sendData(api_acesso.url + `/auth/reset-verify-token/${ token }`, {},{
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    })
  }

  static resetPassword (data) {
    const payload = {
      token: data.token,
      password: data.password
    }

    return this.updateData(api_acesso.url + `/auth/reset-password`, payload,{
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`)
    })
  }
}

export default AuthService
