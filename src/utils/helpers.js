import store from '@/store'
import linkifyStr from 'linkify-string'

const convertTextLink = (text) => {
  return linkifyStr(text, { target: '_blank' })
}

const download = function (data, title, type = 'application/p7s') {
  let blob = new Blob([data], { type: type })
  let url = window.URL.createObjectURL(blob)
  var a = document.createElement("a")
  document.body.appendChild(a)
  a.href = url

  // pegando nome do arquivo e juntando com a ext .p7s
  a.download = title

  a.click()
  a.remove()
}

const getRoleById =  (role_id) => {
  return store.getters['admin/roles'].find(role => role.id == role_id)
}

const getServiceById =  (service_id) => {
  return store.getters['admin/services'].find(service => service.id == service_id)
}

export { download, getRoleById, getServiceById, convertTextLink }
