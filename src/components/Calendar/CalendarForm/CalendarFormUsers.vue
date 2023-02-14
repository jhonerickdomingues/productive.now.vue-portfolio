<template>
  <div>
    <hr class="pt-0 mt-0">
    <div>
      <h5>Responsáveis:</h5>
    </div>
    <div class="row mb-1">
      <div class="col-8">
        <ul>
          <li v-for="(taskUser, index) in taskUsers" :key="`user_${index}`">
            <span v-if="taskUser.user.name">{{ taskUser.user.name }}</span>
            <b-badge v-if="taskUser.leader" variant="success">
              Lider
            </b-badge>
          </li>
        </ul>
      </div>
      <div class="col">
        <b-button
          size="sm"
          variant="primary"
          @click="editUsers = true">
          <feather-icon
            icon="EditIcon"
            class="mr-50" />
          <span class="align-middle">Editar</span>
        </b-button>
      </div>
    </div>
    <CalendarFormUsersModal v-if="editUsers"
                            :prop-task="propTask"
                            :prop-task-users="taskUsers"
                            @onUpdate="(users, deletedUsers) => updateUsers(users, deletedUsers)"
                            @onClose="editUsers = false" />
  </div>
</template>

<script>
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// components
import CalendarFormUsersModal from '@/components/Calendar/CalendarForm/CalendarFormUsersModal'
export default {
  name: "CalendarFormUsers",
  components: {
    CalendarFormUsersModal
  },
  props: {
    propTask: {
      type: Object,
      default: () => ({})
    },
    propTaskUsers: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      taskUsers: [],
      deleteusers: [],
      editUsers: false,
    }
  },
  watch: {
    propTaskUsers () {
      this.taskUsers = [...this.propTaskUsers]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.taskUsers = [...this.propTaskUsers]
    },
    updateUsers (users, deletedUsers) {
      this.taskUsers = [...users]
      this.editUsers = false

      if (deletedUsers.length > 0) {
        this.deleteUsers = [...deletedUsers]
      }

      this.$emit('onUpdate', this.taskUsers, this.deleteUsers)
    }
  }
}
</script>

<style scoped>

</style>
