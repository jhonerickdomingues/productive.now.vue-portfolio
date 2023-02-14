<template>
  <div>
    <b-sidebar
      id="modal-lg"
      width="700px"
      shadow
      centered
      :visible="customerForm.show"
      no-header
      size="md"
      variant="outline-primary"
      right
      backdrop
      no-close-on-backdrop
      title="Serviço"
      @cancel="close()"
      @hidden="close()">
      <template #footer>
        <div class="p-1 text-right">
          <hr>
          <b-button class="mr-1" @click="close()">
            Cancelar
          </b-button>
          <b-button variant="primary" @click="save()">
            {{ isNew ? 'Salvar': 'Editar' }}
          </b-button>
        </div>
      </template>
      <!-- form -->
      <div class="m-1">
        <div>
          <b-img width="100"
                 fluid
                 thumbnail
                 class="mr-2"
                 :src="customer.image || require('@/assets/images/avatars/user.png')"
                 alt="Image 2')" />
          <input id="upload-image-customer" type="file" accept=".jpg,.jpeg,.png" @change="onFileChange">
        </div>
        <br>
        <h3>{{ isNew? 'Novo Cliente': `Editar Cliente: "${customerForm.customer.name}"` }}</h3>
        <b-card v-if="customerForm.show">
          <b-form>
            <!-- name e cnpj -->
            <b-row class="col-12">
              <b-col class="col-6">
                <b-form-group
                  label="Nome"
                  label-for="customer-form-name">
                  <b-input-group class="input-group-merge"
                                 :class="{ 'is-invalid': errors.has('customer-form-name') }">
                    <!--<b-input-group-prepend is-text>
        <feather-icon icon="ConsumersIcon" />
      </b-input-group-prepend>-->
                    <b-form-input
                      id="customer-form-name"
                      v-model="customer.name"
                      v-validate="'required'"
                      :class="{ 'is-invalid': errors.has('customer-form-name') }"
                      name="customer-form-name"
                      placeholder="Nome" />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col class="col-6">
                <b-form-group
                  label="CNPJ"
                  label-for="customer-form-cnpj">
                  <b-input-group class="input-group-merge"
                                 :class="{ 'is-invalid': errors.has('customer-form-cnpj') }">
                    <!--<b-input-group-prepend is-text>
        <feather-icon icon="ConsumersIcon" />
      </b-input-group-prepend>-->
                    <b-form-input
                      id="customer-form-cnpj"
                      v-model="customer.document"
                      v-mask="'##.###.###/####-##'"
                      :class="{ 'is-invalid': errors.has('customer-form-cnpj') }"
                      name="customer-form-cnpj"
                      placeholder="CNPJ"
                      @change="validateCNPJ()" />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- codigo -->
            <b-row class="col-8">
              <b-col cols="4">
                <b-form-group
                  label="Código"
                  label-for="customer-form-code">
                  <b-input-group class="input-group-merge"
                                 :class="{ 'is-invalid': errors.has('customer-form-code') }">
                    <!--<b-input-group-prepend is-text>
        <feather-icon icon="ConsumersIcon" />
      </b-input-group-prepend>-->
                    <b-form-input
                      id="customer-form-code"
                      :value="customer.code"
                      disabled
                      :class="{ 'is-invalid': errors.has('customer-form-code') }"
                      name="customer-form-code"
                      placeholder="Código" />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <hr>
            <!-- status -->
            <b-row class="col-8">
              <b-col cols="6">
                <b-form-group
                  label="Status"
                  :class="{ 'is-invalid': errors.has('customer-form-status') }"
                  label-for="customer-form-status">
                  <v-select id="customer-form-status"
                            v-model="customer.status"
                            label="name"
                            name="customer-form-status"
                            class="is-invalid"
                            :options="['ACTIVE', 'INACTIVE']"
                            placeholder="Status:"
                            @input="changeForm()" />
                </b-form-group>
              </b-col>
            </b-row>
            <hr>
            <h4>Contato</h4>
            <!-- celular e telefone -->
            <b-row class="col-12">
              <b-col cols="8">
                <b-form-group
                  label="E-mail"
                  label-for="customer-form-mail">
                  <b-input-group class="input-group-merge"
                                 :class="{ 'is-invalid': errors.has('customer-form-mail') }">
                    <!--<b-input-group-prepend is-text>
        <feather-icon icon="ConsumersIcon" />
      </b-input-group-prepend>-->
                    <b-form-input
                      id="customer-form-mail"
                      v-model="customer.mail"
                      type="email"
                      :class="{ 'is-invalid': errors.has('customer-form-mail') }"
                      name="customer-form-mail"
                      placeholder="E-mail" />
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  label="Celular"
                  label-for="customer-form-cellphone">
                  <b-input-group class="input-group-merge"
                                 :class="{ 'is-invalid': errors.has('customer-form-cellphone') }">
                    <!--<b-input-group-prepend is-text>
        <feather-icon icon="ConsumersIcon" />
      </b-input-group-prepend>-->
                    <b-form-input
                      id="customer-form-cellphone"
                      v-model="customer.phone"
                      v-mask="'(##) #?####-####'"
                      :class="{ 'is-invalid': errors.has('customer-form-cellphone') }"
                      name="customer-form-cellphone"
                      placeholder="Celular" />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <hr>
            <!--      endereco-->
            <h4>Endereço</h4>
            <div class="col">
              <address-form :prop-address="customer.address"
                            @placechanged="changeAddress" />
            </div>
          </b-form>
        </b-card>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

/* components */
import AddressForm from '@/components/Address/AddressForm'

/* helpers */
import { validarCNPJ } from '@/helpers/functions'

const FORM_INIT = {
  name: '',
  document: '',
  newAddress: {},
  address: {},
  image: '',
  phone: '',
  mail: '',
  observation: '',
  status: 'ACTIVE',
}

export default {
  name: "CustomersForm",
  components: {
    AddressForm
  },
  data () {
    return {
      customer: { ...FORM_INIT }
    }
  },
  computed: {
    ...mapState('customers', ['customerForm']),
    isNew () {
      if (Object.keys(this.customerForm.customer).length > 0) return false
      return true
    },
    money () {
      return {
        decimal: ',',
        thousands: '.',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  watch: {
    'isNew' () {
      if (!this.isNew) {
        Object.assign(this.customer, this.customerForm.customer)
      } else {
        this.customer = { ...FORM_INIT }
      }
    }
  },
  inject: ['$validator'],
  methods: {
    changeAddress (address, place) {
      // this.customer.endereco = addressData, placeResultData, id
      this.customer.newAddress = {
        latitude: address.latitude,
        longitude: address.longitude,
        address: address,
        place: place,
      }
    },
    validateCNPJ () {
      if (!validarCNPJ(this.customer.cnpj)) {
        window.displayMessage('info', 'CNPJ inválido!', 'Informe um CNPJ no formato correto!')
        this.customer.cnpj = null
      }
    },
    close () {
      this.customer = { ...FORM_INIT }
      this.$store.dispatch('customers/close')
    },
    async save () {
      const validate = await this.$validator.validate()

      const { address, newAddress } = this.customer

      const countObject = (object) => {
        return Object.keys(object).length > 0
      }

      const validateAddress = countObject(address) || countObject(newAddress)

      if (validate && validateAddress) {
        if (this.isNew) {
          this.$store.dispatch('customers/saveCustomer', this.customer)
        } else {
          this.$store.dispatch('customers/updateCustomer', this.customer)
        }
      } else {
        if (!validateAddress) {
          return displayMessage('error', 'Atenção', 'Necessário informar o endereço do cliente!')
        }
      }
    },
    onFileChange (e) {
      const file = e.target.files[0]
      this.customer.file = e.target.files
      this.customer.image = URL.createObjectURL(file)
    }
  }
}
</script>

<style scoped>

</style>
