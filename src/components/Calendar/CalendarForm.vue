<template>
  <div class="CalendarForm">
    <b-sidebar
      no-close-on-esc
      no-close-on-backdrop
      width="800px"
      shadow
      :visible="orderForm.show"
      right
      backdrop-variant="primary"
      backdrop>
      <template #footer>
        <div class="p-1">
          <hr>
          <div class="row">
            <div class="col">
              <b-button v-if="orderService._id" variant="danger" class="mr-1 btn-icon" @click="deleteOrderService()">
                <feather-icon icon="TrashIcon" />
                Excluir
              </b-button>
            </div>
            <div class="col text-right">
              <b-button variant="default" class="mr-1" @click="$emit('onClose')">
                Cancelar
              </b-button>
              <b-button variant="primary" @click="save()">
                Salvar
              </b-button>
            </div>
          </div>
        </div>
      </template>
      <template #header>
        <div class="CalendarForm--header">
          <b-button
            size="sm"
            variant="default"
            class="btn-icon rounded-circle"
            @click="$emit('onClose')">
            <feather-icon icon="XIcon" size="20" />
          </b-button>
          {{ isNew ? 'Novos Eventos': 'Editar Eventos' }}
        </div>
      </template>
      <div v-if="orderForm.show" class="px-2 pt-1">
        <div class="row">
          <div class="col-4">
            <b-form-group
              label="Código"
              label-for="code">
              <input id="code-service-order"
                     v-model="orderService.code"
                     v-validate="'required'"
                     :class="{ 'is-invalid': errors.has('code-service-order') }"
                     name="code-service-order"
                     type="text"
                     class="form-control">
            </b-form-group>
          </div>
          <div class="col-8">
            <b-form-group
              label="Cliente"
              :class="{ 'is-invalid': errors.has('customer-service-order') }"
              label-for="customer-service-order">
              <v-select
                id="customer-service-order"
                v-model="orderService.customer"
                v-validate="'required'"
                name="customer-service-order"
                label="name"
                :reduce="customer => customer._id"
                :options="customers" />
            </b-form-group>
          </div>
        </div>
        <CalendarFormTask :prop-tasks="orderService.tasks" @onChange="tasks => changeTasks(tasks)" @onDeleteTask="taskId => deleteTask(taskId)" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import CalendarFormTask from '@/components/Calendar/CalendarForm/CalendarFormTask'
import {mapState} from 'vuex'
import store from '@/store'

export default {
  name: "CalendarForm",
  components: {
    CalendarFormTask
  },
  provide () {
    return {
      $validator: this.$validator,
    }
  },
  data () {
    return {
      orderService: {
        code: null,
        customer: null,
        tasks: [],
        tasksDelete: []
      }
    }
  },
  computed: {
    ...mapState('orders', ['orderForm', 'orders']),
    ...mapState('customers', ['customers']),
    isNew () {
      return !(this.orderForm && !!this.orderForm.task)
    }
  },
  watch: {
    isNew () {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.orderForm && !!this.orderForm.task) {
        const { code, customer, tasks, _id } = this.orderForm.task
        const serviceOrder = {
          _id,
          code,
          customer: customer && customer._id,
          tasks
        }

        Object.assign(this.orderService, serviceOrder)
      }
    },
    changeTasks (tasks) {
      this.orderService.tasks = [...tasks]
    },
    deleteTask (taskId) {
      this.orderService.tasksDelete.push(taskId)
    },
    async save () {
      try {
        loader.show()
        const validate = await this.$validator.validate()

        const validationArray = this.$children.map((child) => {
          return child.$validator.validateAll()
        })


        const childrenValidate = []
        await Promise.all(validationArray).then((v) => {
          if (v[0]) {
            childrenValidate.push(true)
          }
        })

        const serviceValidate = (childrenValidate.length == validationArray.length) && validate

        if (serviceValidate) {
          if (this.orderForm.task && this.orderForm.task._id) {
            store.dispatch('orders/updateEvent', this.orderService)
          } else {
            store.dispatch('orders/saveEvent', this.orderService)
          }
        }
      } finally {
        loader.hide()
      }
    },
    deleteOrderService () {
      store.dispatch('orders/deleteEvent', this.orderService)
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.CalendarForm {
  &--header {
    background-color: white;
    font-weight: bold;
    width: 100%;
    margin: 0;
    padding: 5px 15px;
    padding-top: 10px;
    border-bottom: 5px solid $primary;
  }

  & .b-sidebar-header {
    padding: 0;
  }
}
</style>
