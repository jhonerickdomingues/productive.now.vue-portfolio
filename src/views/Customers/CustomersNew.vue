<template>
  <div>
    <h3><feather-icon size="22" icon="UsersIcon" /> Cadastrar cliente</h3>
    <b-card>
      <customers-form @onChangeForm="customer => formChanged(customer)" />

      <b-row>
        <b-col class="text-center">
          <b-button variant="primary"
                    @click="saveCustomer()">
            Salvar Cliente
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
// components
import CustomersForm from '@/components/Customers/CustomersForm'

// services
import CustomersService from '@/services/CustomersService'

export default {
  name: "CustomerNew",
  components: {CustomersForm},
  data () {
    return {
      customer: {}
    }
  },
  methods: {
    async saveCustomer () {
      try {
        loader.show()
        const status = await this.$validator.validate()
        if (status) {
          const { data } = await CustomersService.store(this.customer)

          this.$router.push({ name: 'customers' })

          setTimeout(() => {
            this.$bvToast.toast(`nome: ${ data.nome }`, {
              title: `Cliente salvo!`,
              variant: 'success',
              solid: true,
              autoHideDelay: 5000
            })
          }, 200)
        }
      } finally {
        loader.hide()
      }
    },
    formChanged (customer) {
      this.customer = customer
    }
  }
}
</script>

<style scoped>

</style>
