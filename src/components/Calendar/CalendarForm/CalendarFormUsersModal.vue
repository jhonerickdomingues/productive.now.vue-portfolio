<template>
  <div>
    <b-modal visible
             title="Responsáveis"
             no-close-on-backdrop
             no-close-on-esc
             @close="$emit('onClose')"
             @cancel="$emit('onClose')"
             @ok="onSave">
      <div class="row mt-2">
        <div class="col">
          <v-select v-model="idsSelecionado"
                    label="name"
                    multiple
                    :reduce="user => user._id"
                    :options="usersAllowed"
                    @option:deselected="excluirColaborador" />
        </div>
      </div>
      <div class="row mt-1">
        <div class="col">
          <b-list-group-item
            v-for="(listItem, index) in users.filter(user => idsSelecionado.indexOf(user._id) > -1)"
            :key="index"
            tag="li">
            <div class="d-flex row">
              <div class="col-2">
                <b-avatar v-if="!listItem.image" :text="listItem.name.slice(0,2)" />

                <b-avatar
                  v-if="listItem.image"
                  size="40"
                  variant="light-primary"
                  :src="listItem.image"
                  class="badge-minimal" />
              </div>
              <div class="col">
                <b-card-text class="mb-0 font-weight-bold">
                  {{ listItem.name }}
                </b-card-text>
                <small>{{ listItem.login }}</small>
              </div>
              <div v-if="listItem.role == 'leader'" class="col-3">
                <small><b>lider</b></small>
                <b-form-checkbox
                  v-model="leader"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('user-leader') }"
                  :value="listItem._id"
                  checked="false"
                  class="custom-control-success form-control-sm"
                  name="user-leader"
                  switch>
                  <span class="switch-icon-left">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span class="switch-icon-right">
                    <feather-icon icon="XIcon" />
                  </span>
                </b-form-checkbox>
              </div>
            </div>
          </b-list-group-item>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "CalendarFormUsersModal",
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
      usersSelected: [],
      deletedUsers: [],
      idsSelecionado: [],
      leader: ''
    }
  },
  computed: {
    ...mapState('users', ['users']),
    ...mapState('orders', ['orders']),
    usersAllowed () {
      const tasks = this.orders.filter(order => order.start.match(this.propTask.startDate) || order.end.match(this.propTask.startDate)).map(order => order.extendedProps)
      const usersTask = []
      tasks.forEach(task => usersTask.push(...task.taskUsers.map(user => user.user)))

      const usersAllowed = this.users.filter(user => !usersTask.find(userTask => userTask._id == user._id) || this.propTaskUsers.find(taskUser => taskUser.user._id == user._id))
      return usersAllowed
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.propTaskUsers.length > 0) {
        // pra efitar side effect
        this.usersSelected = this.propTaskUsers.map(user => {
          if (user.leader) {
            this.leader = user.user._id
          }
          return {
            ...user
          }
        })

        this.idsSelecionado = this.usersSelected.map(user => user.user._id)
      }
    },
    onSave (e) {
      e.preventDefault()
      this.setLeader()
      const hasLeader = this.usersSelected.filter(user => user.leader).length

      if (this.usersSelected.length == 0) {
        return displayMessage('error', 'Atenção', 'Necessário informar a equipe!')
      }
      if (hasLeader == 0) {
        return displayMessage('error', 'Atenção', 'Informe um lider para a equipe!')
      } else {
        this.$emit('onUpdate', this.usersSelected, this.deletedUsers)
      }
    },
    async setLeader () {
      const users = []
      this.users.forEach(user => {
        const taskUser = this.propTaskUsers.find(taskUser => taskUser.user._id === user._id)
        if (this.idsSelecionado.indexOf(user._id) > -1) {
          users.push({
            user: user,
            task: this.propTask,
            leader: user._id == this.leader,
            _id: taskUser?._id || null
          })
        }
      })

      this.usersSelected = users
    },
    excluirColaborador (user) {
      const taskUserFinded = this.propTaskUsers.find(userTask => userTask.user._id === user._id)

      if (taskUserFinded) {
        this.deletedUsers.push(taskUserFinded._id)
      }
    }
  }
}
</script>

<style scoped>

</style>
