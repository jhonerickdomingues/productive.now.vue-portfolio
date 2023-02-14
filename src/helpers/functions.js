'use strict'

export function realToCents (real) {
  const replaces = ['R', '$', '.', ',']
  const cents = []
  for (const key in real) {
    if (replaces.indexOf(real[key]) === -1) {
      cents.push(real[key])
    }
  }
  real = cents.join('')
  return real
}

export function centsToReal (cents) {
  cents = parseInt(cents)

  cents = String(cents)

  let add = 0
  // adicionando +1 pra contar a o hiffen do valor negativo
  if (cents < 0) add = 1

  let real = cents.replace(/([0-9]{2})$/g, ',$1')

  if (real.length === 3 + add) {
    real = cents.replace(/([0-9]{2})$/g, '0,$1')
  }

  if (real.length > 6 + add) {
    real = real.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  return String(real)
}

export function validarCPF (strCPF) {
  strCPF = strCPF.replace(/[\-.]/g, '')
  let Soma
  let Resto
  let i = null
  Soma = 0

  if (strCPF == '00000000000') return false

  for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11))  Resto = 0
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false

  Soma = 0

  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11))  Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false
  return true
}

export function validarCNPJ (cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g,'')

  if (cnpj == '') return false

  if (cnpj.length != 14)
    return false

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false

  // Valida DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0,tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2)
      pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(0))
    return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0,tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2)
      pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(1))
    return false

  return true

}

export function validObj (obj, attrs) {
  if (!Array.isArray(attrs)) return false

  var tmp = obj

  for (let i = 0; i < attrs.length; ++i) {
    if (!tmp || tmp[attrs[i]]) {
      return null
    }
    tmp = tmp[attrs[i]]
  }

  return tmp || null
}

