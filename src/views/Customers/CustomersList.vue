<template>
  <div v-if="$route.name == 'customers'">
    <h3><feather-icon size="22" icon="UsersIcon" /> Clientes cadastrados</h3>
    <b-card>
      <b-row>
        <b-col>
          <b-button variant="primary"
                    @click="newCustomer()">
            <feather-icon icon="UserPlusIcon" />
            Novo cliente
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col>
          <b-form-input
            v-model="customer"
            placeholder="Pesquisar clientes "
            autofocus />
        </b-col>
        <b-col>
          <b-button variant="primary"
                    @click="searchCustomer(customer)">
            <feather-icon icon="SearchIcon" />
            Buscar
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-pagination
            v-model="pagination.page"
            :total-rows="pagination.total"
            :per-page="pagination.perPage"
            align="right"
            @change="e => changePagination(e)" />
          <b-table responsive="sm"
                   :fields="table.fields"
                   :items="customers"
                   show-empty>
            <template #empty>
              <div class="text-center">
                Não há clientes cadastrados.
              </div>
            </template>
            <template #cell(actions)="data">
              <div>
                <!-- edição -->
                <b-button size="sm"
                          class="ml-1"
                          variant="primary"
                          @click="editCustomer(data.item)">
                  <feather-icon
                    class="cursor-pointer"
                    icon="Edit2Icon" />
                </b-button>

                <!-- exclusao -->
                <b-button size="sm"
                          class="ml-1"
                          variant="danger"
                          @click="deleteCustomer(data.item)">
                  <feather-icon
                    class="cursor-pointer"
                    icon="TrashIcon" />
                </b-button>
              </div>
            </template>
            <template #cell(image)="data">
              <div>
                <!-- edição -->
                <img :src="data.item.image"
                     class="img-customer"
                     alt="">
              </div>
            </template>
          </b-table>
          <b-pagination
            v-model="pagination.page"
            :total-rows="pagination.total"
            :per-page="pagination.perPage"
            align="right"
            @change="e => changePagination(e)" />
        </b-col>
      </b-row>
    </b-card>
  </div>

  <div v-else>
    <!-- router-view é usado para renderizar as rotas filhas -->
    <router-view />
  </div>
</template>

<script>
/* services */
import {mapState} from 'vuex'

export default {
  name: "CustomersList",
  data () {
    return {
      customer: '',
      table: {
        fields: [
          // {
          //   key: '_id',
          //   label: '#ID'
          // },
          {
            key: 'image',
            label: 'Imagem'
          },
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
    ...mapState('customers', ['pagination', 'customers'])
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.$store.dispatch('customers/getCustomers', { perPage: 100 })
    },
    async newCustomer () {
      this.$store.dispatch('customers/newCustomer')
    },
    async editCustomer (customer) {
      this.$store.dispatch('customers/edit', customer)
    },
    async deleteCustomer (service) {
      this.$store.dispatch('customers/deleteCustomer', service)
    },
    async searchCustomer (customer) {
      this.$store.dispatch('customers/getCustomers', { name: customer, perPage: 100 })
    },
    changePagination (pagination) {
      this.$store.dispatch('customers/getCustomers', { page: pagination, perPage: 100 })
    }
  }
}
</script>

<style scoped>
 .img-customer {
   height: 50px;
   width: auto;
 }
</style>
