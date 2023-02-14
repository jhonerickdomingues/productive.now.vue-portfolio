const messages = {
  'Invalid user credentials': 'Credenciais do usuário inválidas.',
  'Cannot reuse old password': 'Não é possível usar a senha antiga.',
  'Current password invalid': 'Senha atual informada é inválida.',
}

function getError (error) {
  return messages[error] || error
}

export { messages, getError }
