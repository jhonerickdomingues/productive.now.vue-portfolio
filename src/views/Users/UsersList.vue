<template>
  <div v-if="$route.name == 'users'">
    <h3><feather-icon size="22" icon="UsersIcon" /> Usuários cadastrados</h3>
    <b-card>
      <b-row>
        <b-col>
          <b-button variant="primary"
                    :to="{ name: `users.new` }">
            <feather-icon icon="UserPlusIcon" />
            Novo usuário
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
          <b-table responsive="sm" :fields="table.fields" :items="users" show-empty>
            <template #empty>
              <div class="text-center">
                Não há usuários cadastrados.
              </div>
            </template>
            <template #cell(actions)="data">
              <div>
                <!-- edição -->
                <b-button size="sm"
                          class="ml-1"
                          :to="{ name: 'users.edit', params: { id: data.item._id, propUser: data.item }}"
                          variant="primary">
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
          <b-pagination
            v-model="pagination.page"
            :total-rows="pagination.total"
            :per-page="pagination.perPage"
            align="right"
            @change="changePagination()" />
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
import UsersService from '@/services/UsersService'

export default {
  name: "UsersList",
  data () {
    return {
      users: [],
      pagination: {
        total: null,
        perPage: 20,
        page: 1
      },
      table: {
        fields: [
          {
            key: 'name',
            label: 'Nome'
          },
          {
            key: 'mail',
            label: 'E-mail'
          },
          {
            key: 'login',
            label: 'Login'
          },
          {
            key: 'role',
            label: 'Grupo'
          },
          {
            key: 'actions',
            label: 'Ações'
          }
        ]
      }
    }
  },
  watch: {
    $route: function (newRoute) {
      if (newRoute.name == 'users')
        this.getUsers()
    }
  },
  mounted () {
    this.getUsers()
  },

  methods: {
    async getUsers (options = { loader: true }) {
      try {
        options.loader && loader.show()
        const { data } = await UsersService.index(this.pagination)
        this.users = data
        // this.pagination.total = data.total
      } finally {
        options.loader && loader.hide()
      }
    },
    async deleteUser (user) {
      const status = await window.displayMessage('question', 'Atenção', `Excluir usuário de ${ user.name }?`)

      // se usuário confirmar a excusão
      if (status.isConfirmed) {
        try {
          loader.show()
          // deletamos o usário
          await UsersService.delete(user._id)

          setTimeout(() => {
            this.$bvToast.toast(`Usuário removido: ${ user.name }`, {
              title: `Usuário ${ user.name } removido!`,
              variant: 'success',
              solid: true,
              autoHideDelay: 5000
            })
          }, 200)

          // recarregamos os usuários
          this.getUsers({ loader: false })
        } finally {
          loader.hide()
        }
      }
    },
    changePagination () {
      setTimeout(() => {
        this.getUsers()
      }, 200)
    }
  }
}
</script>

<style scoped>

</style>
