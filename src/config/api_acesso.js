'use strict'

module.exports = {
  url: process.env.VUE_APP_API_BUSCA_URL,
  secret: `Bearer ${localStorage.getItem('access_token')}`
}
