<template>
  <div v-if="propTask.taskComments && propTask.taskComments.length > 0" class="mt-1 mb-2">
    <hr class="pt-0 mt-0">
    <div>
      <h5>Comentários:</h5>
    </div>
    <div class="row">
      <div v-if="propTask.taskComments.length == 0" class="col">
        - Nenhum comentário
      </div>
      <div v-else class="col">
        - {{ propTask.taskComments.length }} comentário{{ propTask.taskComments.length >1 ? 's' : '' }}
      </div>
      <div class="col-4">
        <b-button size="sm" @click="modalComments.show = true">
          Visualizar comentários
        </b-button>
      </div>
    </div>
    <CalendarFormCommentsModal v-if="modalComments.show" :prop-comments="propTask.taskComments" @onClose="modalComments.show = false" />
  </div>
</template>

<script>
import CalendarFormCommentsModal
  from '@/components/Calendar/CalendarForm/CalendarFormComments/CalendarFormCommentsModal'

export default {
  name: 'CalendarFormComments',
  components: {
    CalendarFormCommentsModal,
  },
  props: {
    propTask: {
      type: Object,
      default: () => ({ comments: [] })
    }
  },
  data () {
    return {
      modalComments: {
        show: false,
      },
    }
  }
}
</script>
