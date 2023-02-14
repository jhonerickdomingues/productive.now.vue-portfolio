'use strict'

import BaseService from '@/services/BaseService'
import api_acesso from '@/config/api_acesso'

export default class BoletoService extends BaseService {
  static index (params) {
    const endpoint = api_acesso.url + `/user/boletos`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
      params: params
    }

    return this.getData(endpoint, config)
  }
}
