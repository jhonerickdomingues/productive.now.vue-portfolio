<template>
  <div>
    <div class="row">
      <div class="col mt-2">
        <h3>Tarefas</h3>
      </div>

      <div class="col-4">
        <b-form-group
          label="Filtre por data"
          label-for="dates-filter-test">
          <v-select id="dates-filter-test"
                    v-model="dateFilter"
                    placeholder="Selecione uma data"
                    :options="datesFilter"
                    label="label"
                    :reduce="date => date.value" />
        </b-form-group>
      </div>
    </div>
    <div v-for="(task, index) in tasks" :key="`task-${index}`" @keyup="$emit('onChange', tasks)">
      <b-card v-if="!dateFilter || task.startDate == dateFilter" no-body class="m-0 CalendarFormTask-card">
        <!-- HEADER COLLAPSE -->
        <template #header>
          <div class="w-100 CalendarFormTask-card-header" @click="task.visible = !task.visible">
            <div class="row">
              <div class="col">
                <div>
                  <h4 class="text-left m-0 CalendarFormTask-card-h4 not-selectable" size="sm" variant="default" block>
                    <feather-icon :icon="task.visible?'ChevronDownIcon':'ChevronRightIcon'" /> Tarefa {{ index + 1 }} - {{ task.startDate | invertDate }}
                    {{ task.startTime ? 'às ' + task.startTime: '' }}
                  </h4>
                </div>
              </div>
              <div v-if="!!task.status" class="col-2 text-left not-selectable">
                <b-badge :variant="`${ STATUS_TASKS_OBJ[task.status].color }`"
                         class="badge-glow CalendarFormTask-badge">
                  {{ STATUS_TASKS_OBJ[task.status].label }}
                </b-badge>
              </div>
              <div class="col-2 text-right" style="height: 30px">
                <b-button v-if="tasks.length > 1"
                          class="btn-icon rounded-circle"
                          size="sm"
                          circle
                          variant="danger"
                          @click="deleteTask(index)">
                  <feather-icon
                    icon="TrashIcon" />
                </b-button>
                <!--                <b-avatar variant="primary" style="height: 30px ;width: 30px">
                  <feather-icon
                    icon="TrashIcon" />
                </b-avatar>-->
              </div>
            </div>
          </div>
        </template>
        <!-- COLLAPSE -->
        <div v-if="(task.visible || task.startDate == dateFilter)" class="px-1">
          <b-collapse :id="`collapse-${index}`" :visible="(task.visible || task.startDate == dateFilter)">
            <div>
              <!-- SERVICE -->
              <div class="row">
                <div class="col-6">
                  <b-form-group
                    label="Serviço"
                    :class="{'is-invalid': errors.has(`service-task-${index}`)}"
                    label-for="service">
                    <v-select
                      :id="`service-task-${index}`"
                      v-model="task.service"
                      v-validate="'required'"
                      :name="`service-task-${index}`"
                      label="name"
                      :reduce="service => service._id"
                      :options="services"
                      @input="startDateChanged(task, index)" />
                  </b-form-group>
                </div>

                <!-- STATUS -->
                <div class="col-6">
                  <b-form-group
                    label="Status"
                    :class="{'is-invalid': errors.has(`service-status-${index}`)}"
                    label-for="service">
                    <v-select
                      id="status"
                      v-model="task.status"
                      v-validate="'required'"
                      :name="`service-status-${index}`"
                      label="label"
                      :reduce="status => status.value"
                      :options="STATUS_TASKS_ARRAY"
                      @input="$emit('onChange', tasks)" />
                  </b-form-group>
                </div>
              </div>

              <!-- DATE and TIME - START -->
              <div class="row">
                <div class="col-6">
                  <b-form-group
                    label="Data inicio"
                    label-for="datastart">
                    <input v-model="task.startDate"
                           v-validate="'required'"
                           type="date"
                           :name="`service-date-start-${index}`"
                           :class="{'is-invalid': errors.has(`service-date-start-${index}`)}"
                           class="form-control"
                           @change="startDateChanged(task, index)">
                  </b-form-group>
                </div>

                <div class="col-6">
                  <b-form-group
                    label="Hora inicio"
                    label-for="data">
                    <input v-model="task.startTime"
                           v-validate="'required'"
                           type="time"
                           class="form-control"
                           :name="`service-time-start-${index}`"
                           :class="{'is-invalid': errors.has(`service-time-start-${index}`)}"
                           @change="startDateChanged(task, index)">
                  </b-form-group>
                </div>
              </div>

              <!-- DATE and TIME - END -->
              <div v-if="task.status === 'COMPLETED'" class="row  ">
                <div class="col-6">
                  <b-form-group
                    label="Data fim"
                    label-for="datastart">
                    <input v-model="task.endDate"
                           v-validate="'required'"
                           type="date"
                           :name="`service-date-end-${index}`"
                           :class="{'is-invalid': errors.has(`service-date-end-${index}`)}"
                           class="form-control"
                           @change="$emit('onChange', tasks)">
                  </b-form-group>
                </div>

                <div class="col-6">
                  <b-form-group
                    label="Hora fim"
                    label-for="data">
                    <input v-model="task.endTime"
                           v-validate="'required'"
                           type="time"
                           :name="`service-time-end-${index}`"
                           :class="{'is-invalid': errors.has(`service-time-end-${index}`)}"
                           class="form-control"
                           @change="$emit('onChange', tasks)">
                  </b-form-group>
                </div>
              </div>

              <!-- DESCRICAO -->
              <div class="row">
                <div class="col-12">
                  <b-form-group
                    label="Descrição"
                    label-for="description">
                    <textarea v-model="task.description"
                              class="form-control" />
                  </b-form-group>
                </div>
              </div>

              <!-- taskUsers -->
              <CalendarFormUsers
                :prop-task="task"
                :prop-task-users="task.taskUsers"
                @onUpdate="(taskUsers, deletedUsers) => updateUsers(taskUsers, deletedUsers, index)" />
              <!-- taskUsers -->

              <!-- comments -->
              <CalendarFormComments :prop-task="task" />
              <!-- comments -->
            </div>
          </b-collapse>
        </div>
      </b-card>
    </div>


    <!-- NOTAS TAREFAS -->
    <div class="text-center mt-1">
      <b-button variant="primary"
                @click="newTask()">
        <feather-icon
          icon="PlusIcon"
          class="mr-50" />
        <span class="align-middle">Adicionar tarefa</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import CalendarFormUsers from '@/components/Calendar/CalendarForm/CalendarFormUsers'
import CalendarFormComments from '@/components/Calendar/CalendarForm/CalendarFormComments/CalendarFormComments'
import {mapState} from 'vuex'

// constants
import { task, STATUS_TASKS_ARRAY, STATUS_TASKS_OBJ } from '@/constants/tasks'
import moment from 'moment'

export default {
  name: "CalendarFormTask",
  components: {
    CalendarFormUsers,
    CalendarFormComments,
  },
  props: {
    propTasks: {
      type: Array,
      default: () => ([])
    }
  },
  inject: ['$validator'],
  data () {
    return {
      tasks: [
        { ...task }
      ],
      STATUS_TASKS_ARRAY,
      STATUS_TASKS_OBJ,
      dateFilter: null
    }
  },
  computed: {
    ...mapState('orders', ['orderForm']),
    ...mapState('services', ['services']),
    datesFilter () {
      return this.tasks.map((task, index) => ({ value: task.startDate, label: `Tarefa ${ index + 1} - ${moment(task.startDate).format('DD/MM/YYYY')}` }))
    }
  },
  watch: {
    propTasks () {
      this.init()
    },
    dateFilter (value) {
      this.$store.dispatch('orders/updateDate', value)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.propTasks.length > 0) {
        this.tasks = this.propTasks.map(task => {
          const { service, description, start, end, taskUsers, visible, _id } = task
          return {
            ...task,
            _id,
            service: service?._id || service,
            description,
            start,
            end,
            taskUsers,
            visible: visible || false
          }
        })
      }

      if (this.orderForm.date && !this.dateFilter) {
        this.dateFilter = this.orderForm.date
      }
    },
    newTask () {
      this.tasks.forEach(task => task.visible = false)
      const index = this.tasks.length - 1

      const { description, startDate, startTime, taskUsers, service } = { ...this.tasks[index] }

      const newUsers = taskUsers.map(({ user, leader }) => {
        return {
          task: null,
          user,
          leader
        }
      })
      this.tasks.push({ description, startDate, startTime, taskUsers: newUsers, visible: true, service, status: 'WAITING'})

      this.emit()
    },
    deleteTask (index) {
      if (this.tasks[index] && this.tasks[index]._id) {
        this.$emit('onDeleteTask', this.tasks[index]._id)
      }
      this.tasks.splice(index, 1)
      this.emit()
    },
    updateUsers (taskUsers, deletedUsers, index) {
      this.tasks[index].taskUsers = [...taskUsers]
      this.tasks[index].deletedUsers = deletedUsers ? [...deletedUsers] : []
      this.$emit('onChange', this.tasks)
    },
    async emit () {
      this.$emit('onChange', this.tasks)
    },
    async startDateChanged (task, index) {
      if (task.startDate && task.startTime) {
        const { duration } = this.services.find(service => service._id == task.service)
        const start = moment(`${task.startDate} ${task.startTime}`, 'YYYY-MM-DD HH:mm')
        const minutes = this.convertHourToMinute(duration)
        const end = moment(start, 'YYYY-MM-DD HH:mm').add(minutes, 'minutes').format('YYYY-MM-DD|HH:mm')
        const [endDate,endTime] = end.split('|')
        task.endDate = endDate
        task.endTime = endTime
        this.tasks[index] = {...task}
      }
      this.$emit('onChange', this.tasks)
    },
    convertHourToMinute (hourString) {
      const [hour, minutes] = hourString.split(':')
      return +minutes + (+hour * 60)
    }
  }
}
</script>

<style lang="scss">
.CalendarFormTask {
  &-badge {
    margin-top: 5px;
  }

  &-card {
    & .card-header {
      padding: 0;
      cursor: pointer !important;
    }

    margin-top: 10px !important;

    & h4 {
      margin-top: 5px !important;
    }
  }

  &-card-header {
    padding: 15px;
  }
}
</style>
