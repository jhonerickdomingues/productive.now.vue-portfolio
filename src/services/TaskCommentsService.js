import BaseService from '@/services/BaseService'
import api_acesso from '@/config/api_acesso'

class TaskCommentsService extends BaseService {
  static index (taskId) {
    const endpoint = api_acesso.url + `/task-comments/${taskId}`
    const config = {
      headers: this.getHeaders(`Bearer ${localStorage.access_token}`),
    }

    return this.getData(endpoint, config)
  }
}

export default TaskCommentsService
