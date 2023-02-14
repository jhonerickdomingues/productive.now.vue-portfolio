<template>
  <div>
    <h3><feather-icon size="22" icon="UserPlusIcon" /> Novo usuário</h3>
    <b-card>
      <b-row>
        <b-col cols="12">
          <users-form @onChangeForm="(form) => formChanged(form)" />

          <b-button variant="primary"
                    @click="saveUser()">
            Salvar Usuário
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
/* components */
import UsersForm from '@/components/Users/UsersForm'

/* services */
import UsersService from '@/services/UsersService'

export default {
  name: "UsersNew",
  components: {
    UsersForm
  },
  provide () {
    return {
      $validator: this.$validator,
    }
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    formChanged (formReceived) {
      this.user = formReceived
    },
    async saveUser () {
      try {
        loader.show()
        const status = await this.$validator.validate()
        if (status) {
          const { data } = await UsersService.store(this.user)

          objSwal.info.title = `Usuário ${ data.name } salvo com sucesso!`
          objSwal.info.html = `
              nome:
              <b>${ data.name }</b>
              <br><br>
              login:
              <b>${ data.login }</b><br>
              email:
              <b>${ data.email }</b><br>
              senha:
              <b>${ data.password }</b>
            `
          Swal.fire(objSwal.info).finally(() => {
            delete objSwal.info.html

            this.$router.push({ name: 'users' })

            setTimeout(() => {
              this.$bvToast.toast(`nome: ${ data.name }`, {
                title: `Usuário salvo!`,
                variant: 'success',
                solid: true,
                autoHideDelay: 5000
              })
            }, 200)
          })}
      } finally {
        loader.hide()
      }
    }
  }
}
</script>

<style scoped>

</style>
