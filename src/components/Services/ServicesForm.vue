<template>
  <div>
    <b-sidebar
      id="modal-lg"
      width="600px"
      shadow
      centered
      :visible="serviceForm.show"
      no-header
      size="md"
      variant="outline-primary"
      right
      backdrop
      no-close-on-backdrop
      title="Serviço"
      @cancel="close()"
      @hidden="close()"
      @ok="save()">
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
      <div v-if="serviceForm.show" class="p-1">
        <b-card>
          <h3>{{ isNew? 'Novo Serviço': `Editar Serviço: "${serviceForm.service.name}"` }}</h3>
          <div class="row mt-1">
            <div class="col-8">
              <b-form-group
                label="Nome"
                label-for="service.name">
                <input id="service.name"
                       v-model="service.name"
                       v-validate="'required'"
                       name="service.name"
                       :class="{ 'is-invalid': errors.has('service.name') }"
                       type="text"
                       class="form-control">
              </b-form-group>
            </div>
            <div class="col-4">
              <b-form-group
                label="Duração"
                label-for="service.duration">
                <input id="service.duration"
                       v-model="service.duration"
                       v-validate="'required'"
                       name="service.duration"
                       :class="{ 'is-invalid': errors.has('service.duration') }"
                       type="time"
                       class="form-control">
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b-form-group
                label="Formulários"
                label-for="service.duration">
                <v-select v-model="service.forms"
                          :options="forms"
                          :reduce="option => option._id"
                          multiple
                          label="name" />
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b-form-group
                label="Descrição"
                label-for="service.duration">
                <b-textarea v-model="service.description" />
              </b-form-group>
            </div>
          </div>
        </b-card>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const FORM_INIT = {
  name: '',
  duration: '',
  forms: [],
  description: ''
}

export default {
  name: "ServicesForm",
  data () {
    return {
      service: { ...FORM_INIT },
      forms: [
        {
          _id: 'sdfsad',
          name: 'Form One',
        },
        {
          _id: 'rsrs',
          name: 'Form Two',
        }
      ]
    }
  },
  computed: {
    ...mapState('services', ['serviceForm']),
    isNew () {
      if (Object.keys(this.serviceForm.service).length > 0) return false
      return true
    }
  },
  watch: {
    'isNew' () {
      if (!this.isNew) {
        Object.assign(this.service, this.serviceForm.service)
      } else {
        this.service = { ...FORM_INIT }
      }
    }
  },
  methods: {
    async save () {
      const validate = await this.$validator.validate()

      if (validate) {
        if (this.isNew) {
          this.$store.dispatch('services/saveService', this.service)
        } else {
          this.$store.dispatch('services/updateService', this.service)
        }
      }
    },
    close () {
      this.$store.dispatch('services/close')
    }
  }
}
</script>


<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
