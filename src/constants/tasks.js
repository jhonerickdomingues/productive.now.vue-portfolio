import moment from 'moment'

const task = {
  service: '',
  description: '',
  startDate: moment(new Date).format('YYYY-MM-DD'),
  startTime: '',
  endDate: moment(new Date).format('YYYY-MM-DD'),
  endTime: '',
  taskUsers: [],
  deletedUsers: [],
  visible: true,
  status: 'WAITING'
}

const STATUS_TASKS_ARRAY = [
  { value: 'WAITING', label: 'Aguardando', color: 'secondary' },
  { value: 'IN_PROGRESS', label: 'Em progresso', color: 'primary' },
  { value: 'COMPLETED', label: 'Concluída', color: 'success' },
  { value: 'CANCELED', label: 'Cancelada', color: 'danger' },
  { value: 'IMPEDED', label: 'Impedida', color: 'warning' },
]

const STATUS_TASKS_OBJ = {
  WAITING: { label: 'Aguardando', color: 'secondary' },
  IN_PROGRESS: { label: 'Em progresso', color: 'primary'},
  COMPLETED: { label: 'Concluída', color: 'success' },
  CANCELED: { label: 'Cancelada', color: 'danger' },
  IMPEDED: { label: 'Impedida', color: 'warning' },
}

export {
  task,
  STATUS_TASKS_OBJ,
  STATUS_TASKS_ARRAY
}
