<template>
  <div>
    <h3><feather-icon size="22" icon="UserIcon" /> Editar usuário</h3>
    <b-card>
      <b-row>
        <b-col cols="12">
          <users-form :prop-user="user"
                      @onChangeForm="(form) => formChanged(form)" />
          <b-button variant="primary"
                    @click="updateUser()">
            Atualizar
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
/* components */
import UsersForm from "@/components/Users/UsersForm"

/* services */
import UsersService from "@/services/UsersService"

export default {
  name: "UsersEdit",
  components: {
    UsersForm
  },
  props: {
    propUser: {
      default: () => ({}),
      type: Object
    }
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.boot()
  },
  methods: {
    async boot () {
      // se vier direto da listagem mostramos o valor da prop
      // para economizar requisição
      if (Object.values(this.propUser).length) {
        Object.assign(this.user, this.propUser)
      } else {
        // caso não tenha na propUser, pegaremos do service
        const { id } = this.$route.params

        // pegamos os dados da requisição
        const { data } = await UsersService.show(id)

        // juntando dados da requisição no user local
        this.user = data
      }
    },
    formChanged (formReceived) {
      console.log(formReceived)
      this.user = formReceived
    },
    async updateUser () {
      try {
        loader.show()

        // pegamos id da rota
        const { id } = this.$route.params

        const { data } = await UsersService.update(id, this.user)

        this.$router.push({ name: 'users' })

        setTimeout(() => {
          this.$bvToast.toast(`nome: ${ data.name }`, {
            title: `Usuário atualizado!`,
            variant: 'success',
            solid: true,
            autoHideDelay: 5000
          })
        }, 200)
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

<style scoped>

</style>
