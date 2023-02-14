<template>
  <div class="app-calendar overflow-hidden border p-0 col-sm-12">
    <div class="row no-gutters">
      <!-- Sidebar -->
      <div
        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column"
        :class="{'show': orderForm.show}">
        <calendar-sidebar @onNewEvent="addTask()" />
      </div>

      <!-- Calendar -->
      <div class="col position-relative">
        <div class="card shadow-none border-0 mb-0 rounded-0">
          <div class="card-body pb-0">
            <calendar />
          </div>
        </div>
      </div>

      <!-- Sidebar Overlay -->
      <div
        class="body-content-overlay"
        @click="() => {}" />
      <CalendarForm @onClose="closeTask()" />
    </div>
  </div>
</template>

<script>
import CalendarSidebar from '@/components/Calendar/calendar-sidebar/CalendarSidebar.vue'

// components
import CalendarForm from '@/components/Calendar/CalendarForm'
import Calendar from '@/components/Calendar/Calendar'

// vuex
import { mapActions, mapState } from 'vuex'

export default {
  name: "CalendarView",
  components: {
    CalendarSidebar,
    CalendarForm,
    Calendar,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('orders', ['orderForm']),
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('orders', ['getTasks', 'addTask', 'closeTask']),
    ...mapActions('customers', ['getCustomers']),
    ...mapActions('services', ['getServices']),
    ...mapActions('users', ['getUsers']),
    async init () {
      // this.getTasks()
      this.getCustomers({ perPage: 200 })
      this.getServices()
      this.getUsers()
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>
