<template>
  <div>
    <full-calendar
      ref="refCalendar"
      class="full-calendar"
      :options="calendarOptions">
      <template #eventContent="arg">
        <div :id="arg.event.id">
          <div>
            <b-avatar
              size="sm"
              :src="arg.event.extendedProps.imageUser || require('@/assets/images/avatars/user.png')" />
            <b-avatar
              size="sm"
              rounded
              :src="arg.event.extendedProps.customer.image || require('@/assets/images/avatars/user.png')" />
            {{ arg.event.title }}
            <!--<small>{{ arg.event.extendedProps.customer.name }}</small>-->
          </div>


          <div />
        </div>
        <b-tooltip
          ref="tooltip"
          :variant="arg.event.extendedProps.statusColor"
          :target="arg.event.id"
          container>
          <b-avatar
            size="6em"
            rounded
            :src="arg.event.extendedProps.customer.image || require('@/assets/images/avatars/user.png')" />
          <h6
            class="text-left text-white mt-1">
            Cliente: <b>{{ arg.event.extendedProps.customer.name }}</b> <br>
            <hr style="border-color: white">
            Serviço: <b>{{ arg.event.extendedProps.service }}</b> <br>
            <hr style="border-color: white">
            time: <br>
            <ul class="m-0 p-0">
              <li v-for="(taskUser, index) in arg.event.extendedProps.taskUsers" :key="`user_${index}`">
                <span v-if="taskUser.user.name">- {{ taskUser.user.name }} </span>
                <b-badge v-if="taskUser.leader" variant="dark">
                  Lider
                </b-badge>
              </li>
            </ul>
          </h6>
        </b-tooltip>
      </template>
    </full-calendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import ptBrLocale from "@fullcalendar/core/locales/pt-br"

// vuex
import store from '@/store'

// constants
import { STATUS_TASKS_OBJ } from '@/constants/tasks'
import moment from 'moment'
import _ from 'lodash'
import {mapState} from 'vuex'

export default {
  name: "Calendar",
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    propEvents: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      title: null,
      calendarOptions: {
        locale: ptBrLocale,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          start: 'sidebarToggle, prev,next, title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        },
        events: [],/*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
        editable: false,

        /*
          Enable resizing event from start
          ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
        */
        eventResizableFromStart: true,

        /*
          Automatically scroll the scroll-containers during event drag-and-drop and date selecting
          ? Docs: https://fullcalendar.io/docs/dragScroll
        */
        dragScroll: false,

        /*
          Max number of events within a given day
          ? Docs: https://fullcalendar.io/docs/dayMaxEvents
        */
        dayMaxEvents: 5,

        /*
          Determines if day names and week names are clickable
          ? Docs: https://fullcalendar.io/docs/navLinks
        */
        navLinks: true,
        datesSet: async (payload) => {
          const calendarApi = this.$refs.refCalendar.getApi()
          if (calendarApi.currentData.viewTitle != this.title) {
            this.title = calendarApi.currentData.viewTitle
            await this.changeMonth(payload)
          }
        },

        eventClassNames ({ event: calendarEvent }) {
          // eslint-disable-next-line no-underscore-dangle
          const colorName = calendarEvent._def.extendedProps.statusColor

          return [
            // Background Color
            `bg-${colorName}`,
            `text-white`,
            `border-${colorName}`
          ]
        },
        eventClick ({ event: clickedEvent }) {
          // * Only grab required field otherwise it goes in infinity loop
          // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
          // event.value = grabEventDataFromEventApi(clickedEvent)

          // eslint-disable-next-line no-use-before-define
          // isEventHandlerSidebarActive.value = true
          const start = moment(clickedEvent._instance.range.start).format('YYYY-MM-DD')
          const { extendedProps: { serviceOrder } } = clickedEvent

          //{ task, date }
          store.dispatch('orders/editTask', { task: serviceOrder, date: start })
        },

        customButtons: {
          sidebarToggle: {
            // --- This dummy text actual icon rendering is handled using SCSS ----- //
            text: 'sidebar',
            click () {
              // eslint-disable-next-line no-use-before-define
              // isCalendarOverlaySidebarActive.value = !isCalendarOverlaySidebarActive.value
              console.log('sla oq vai  fazer')
            },
          },
        },

        dateClick (info) {
          store.dispatch('orders/addTask', { start: info.dateStr })
        },
        // eventDrop ({ event: droppedEvent }) {
        //   console.log('eventDrop', droppedEvent)
        // },

        /*
          Handle event resize
          ? Docs: https://fullcalendar.io/docs/eventResize
        */
        eventResize ({ event: resizedEvent }) {
          console.log('eventResize', resizedEvent)
        },
      },
    }
  },
  computed: {
    ...mapState('orders', ['orders']),
  },
  watch: {
    orders () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.calendarOptions.events = [...this.orders]
    },
    changeMonth: _.debounce((payload) => {
      try {
        loader.show()
        const params = {
          startDate: moment(payload.startStr).format('YYYY-MM-DD'),
          endDate: moment(payload.endStr).format('YYYY-MM-DD')
        }

        store.dispatch('orders/getTasks', params)
      } finally {
        loader.hide()
      }
    }, 500)
  }
}
</script>

<style scoped>

</style>
