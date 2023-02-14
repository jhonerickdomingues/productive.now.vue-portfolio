<template>
  <div>
    <h3><feather-icon size="22" icon="UsersIcon" /> Serviços</h3>
    <b-card>
      <b-row>
        <b-col>
          <b-button variant="primary" @click="newService()">
            <feather-icon icon="UserPlusIcon" />
            Novo Serviço
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <!--          <b-pagination-->
          <!--            v-model="pagination.page"-->
          <!--            :total-rows="pagination.total"-->
          <!--            :per-page="pagination.perPage"-->
          <!--            align="right"-->
          <!--            @change="changePagination()" />-->
          <b-table responsive="sm" :fields="table.fields" :items="services" show-empty>
            <template #empty>
              <div class="text-center">
                Não há serviços cadastrados.
              </div>
            </template>
            <template #cell(actions)="data">
              <div>
                <!-- edição -->
                <b-button size="sm"
                          class="ml-1"
                          variant="primary"
                          @click="editService(data.item)">
                  <feather-icon
                    class="cursor-pointer"
                    icon="Edit2Icon" />
                </b-button>

                <!-- exclusao -->
                <b-button size="sm"
                          class="ml-1"
                          variant="danger"
                          @click="deleteUser(data.item)">
                  <feather-icon
                    class="cursor-pointer"
                    icon="TrashIcon" />
                </b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
// services
import { mapState} from 'vuex'

export default {
  name: "Services",
  data () {
    return {
      table: {
        fields: [
          {
            key: 'name',
            label: 'Nome'
          },
          {
            key: 'actions',
            label: 'Ações'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('services', ['services'])
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.$store.dispatch('services/getServices')
    },
    async newService () {
      this.$store.dispatch('services/newService')
    },
    async editService (service) {
      this.$store.dispatch('services/edit', service)
    },
    async deleteUser (service) {
      this.$store.dispatch('services/deleteService', service)
    }
  }
}
</script>

<style scoped>

</style>
