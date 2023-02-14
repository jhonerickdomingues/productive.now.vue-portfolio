<template>
  <div>
    <div>
      <div class="row">
        <div class="col-10 offset-1">
          <b-card class="card--border">
            <div class="row">
              <div class="col-6">
                <b-form-group
                  label="Nome"
                  label-for="datastart">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="ClipboardIcon" />
                    </b-input-group-prepend>
                    <input placeholder="Digite o nome do formulário" class="form-control">
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <!--            <b-input-group
                  prepend="Descrição"
                  class="">
                </b-input-group>-->
                <b-form-group
                  label="Descrição"
                  label-for="datastart">
                  <b-input-group class="input-group-merge">
                    '
                    <b-input placeholder="Descrição do formulário..." />'
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <!--
      <div class="row">
        <div class="col-10 offset-1">
          <app-collapse
            :type="'border'">
            <app-collapse-item v-for="(input, indexInput) in form.inputs"
                               :key="`input_${indexInput}_${_uid}`"
                               :is-visible="!!input.is_visible"
                               :title="input.question || 'Digite a sua pergunta...'"
                               style="margin-bottom: 1px;">
              <div class="row">
                <div class="col">
                  <input v-model="input.question" type="text" class="form-control" placeholder="Digite a sua pergunta...">
                </div>
                <div class="col">
                  <v-select v-model="input.type"
                            placeholder="Escolha o tipo da pergunta"
                            :options="inputTypes"
                            label="name"
                            :reduce="input => input.value" />
                </div>
              </div>
            </app-collapse-item>
          </app-collapse>
          <div class="mt-1 text-center">
            <b-button
              variant="primary"
              class="btn-icon"
              @click="newQuestion()">
              <feather-icon icon="PlusIcon" /> Nova pergunta
            </b-button>
          </div>
        </div>
      </div>
      -->

      <div class="row">
        <div v-for="(input, indexInput) in form.inputs"
             :key="`input_${indexInput}_${_uid}`"
             class="col-10 offset-1">
          <b-card :title="input.question" class="mb-1">
            <FormsInputTypeRender :type="input.type" />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import FormsInputTypeRender from '@/components/Forms/FormsInputTypeRender.vue'
import {inputTypes} from '@/constants/forms'

const INPUT_DEFAULT = { question: null, type: null, is_visible: true, }

export default {
  name: "Forms",
  components: {
    AppCollapse,
    AppCollapseItem,
    FormsInputTypeRender,
  },
  data () {
    return {
      form: {
        inputs: [
          { question: 'O que é uma resposta curta?', type: 'short_text' },
          { question: 'O que é uma resposta de paragrafo?', type: 'long_text' },
          { question: 'O que é uma resposta de unique_option?', type: 'unique_option' },
          { question: 'O que é uma resposta de many_option?', type: 'many_option' },
          { question: 'O que é uma resposta de unique_img?', type: 'unique_img' },
          { question: 'O que é uma resposta de many_img?', type: 'many_img' },
        ],
      },
      inputTypes: inputTypes,
    }
  },
  methods: {
    newQuestion () {
      this.form.inputs.push({...INPUT_DEFAULT})
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.card--border {
  border-bottom: 10px solid $purple;
}
</style>
