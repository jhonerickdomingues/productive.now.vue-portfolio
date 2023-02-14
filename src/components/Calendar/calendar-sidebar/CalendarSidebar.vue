<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
    <div class="p-2">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        aria-controls="sidebar-add-new-event"
        :aria-expanded="String(isEventHandlerSidebarActive)"
        variant="primary"
        block
        @click="$emit('onNewEvent')">
        <feather-icon icon="PlusIcon" /> Novo Evento
      </b-button>
      <div class="mt-3">
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">Filtrar por STATUS</span>
        </h5>
        <b-form-checkbox
          class="mb-1"
          :checked="checkedAll"
          @change="val => checkAll(val)">
          Ver todos
        </b-form-checkbox>
        <hr>
        <b-form-group>
          <b-form-checkbox-group
            v-model="filter.status"
            name="event-filter"
            stacked
            @change="filterOrder">
            <b-form-checkbox
              v-for="item in STATUS_TASKS_ARRAY"
              :key="item.label"
              v-model="filter.status"
              name="event-filter"
              :value="item.value"
              class="mb-1"
              :class="`custom-control-${item.color}`">
              {{ item.label }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>
      <hr>
      <div>
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">Filtrar por Usuário</span>
          <v-select v-model="filter.user"
                    class="mt-1"
                    label="name"
                    :reduce="user => user._id"
                    :options="$store.getters['users/users']"
                    @input="filterOrder" />
        </h5>
      </div>
      <hr>
      <div>
        <h5 class="app-label section-label mb-1">
          <span class="align-middle">Filtrar por Cliente</span>
          <v-select
            v-model="filter.customer"
            label="name"
            :reduce="customer => customer._id"
            class="mt-1"
            :options="$store.getters['customers/customers']"
            @input="filterOrder" />
        </h5>
      </div>
    </div>
    <b-img :src="require('@/assets/images/pages/calendar-illustration.png')" />
  </div>
</template>

<script>
import {
  BButton, BFormGroup, BFormCheckboxGroup, BFormCheckbox, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useCalendarSidebar from './useCalendarSidebar'
import store from '@/store'
import calendarStoreModule from '@/views/Calendar/calendarStoreModule'
import { onUnmounted } from '@vue/composition-api'

import { STATUS_TASKS_ARRAY } from '@/constants/tasks'
const status = ["WAITING", "IN_PROGRESS", "COMPLETED", "CANCELED", "IMPEDED"]

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
    BImg,
    BFormCheckbox,
    BFormGroup,
    BFormCheckboxGroup,
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      require: true,
    },
  },
  data () {
    return {
      STATUS_TASKS_ARRAY,
      filter: {
        user: '',
        customer: '',
        status: status
      }
    }
  },
  computed: {
    checkedAll () {
      return (this.filter.status.length === status.length)
    }
  },
  methods: {
    filterOrder () {
      this.$store.dispatch('orders/getTasks', this.filter)
    },
    checkAll (val) {
      if (val) {
        this.filter.status = [...status]
      } else {
        this.filter.status = []
      }
      this.$store.dispatch('orders/getTasks', this.filter)
    }
  },
  setup () {
    const CALENDAR_APP_STORE_MODULE_NAME = 'calendar'

    // Register module
    if (!store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.registerModule(CALENDAR_APP_STORE_MODULE_NAME, calendarStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CALENDAR_APP_STORE_MODULE_NAME)) store.unregisterModule(CALENDAR_APP_STORE_MODULE_NAME)
    })
  },
}
</script>

<style>

</style>
