<template>
  <div>
    <h3><feather-icon size="22" icon="CustomerIcon" /> Editar cliente</h3>
    <b-card>
      <customers-form :prop-customer="customer"
                      @onChangeForm="(form) => formChanged(form)" />

      <div class="row">
        <div class="col text-center">
          <b-button variant="primary"
                    @click="updateCustomer()">
            Atualizar
          </b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
/* components */
import CustomersForm from "@/components/Customers/CustomersForm"

/* services */
import CustomerService from "@/services/CustomersService"

export default {
  name: "CustomersEdit",
  components: {
    CustomersForm
  },
  props: {
    propCustomer: {
      default: () => ({}),
      type: Object
    }
  },
  data () {
    return {
      customer: {}
    }
  },
  created () {
    this.boot()
  },
  methods: {
    async boot () {
      // se vier direto da listagem mostramos o valor da prop
      // para economizar requisição
      if (Object.values(this.propCustomer).length) {
        Object.assign(this.customer, this.propCustomer)
      } else {
        // caso não tenha na propCustomer, pegaremos do service
        const { id } = this.$route.params

        // pegamos os dados da requisição
        const { data } = await CustomerService.show(id)

        // juntando dados da requisição no customer local
        this.customer = data
      }
    },
    formChanged (formReceived) {
      this.customer = formReceived
    },
    async updateCustomer () {
      try {
        loader.show()

        // pegamos id da rota
        const { id } = this.$route.params

        const { data } = await CustomerService.update(id, this.customer)

        this.$router.push({ name: 'customers' })

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
