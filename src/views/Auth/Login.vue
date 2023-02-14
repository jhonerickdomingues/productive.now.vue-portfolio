<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!--<b-img width="150"
       :src="appLogoLogin"
       alt="Login V2" />-->
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto">
          <b-img
            fluid
            :src="fasorImg"
            alt="Login V2" />
          <br>
          <br>
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1">
            Bem vindo ao Painel! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Informe seu usuário para começar
          </b-card-text>

          <!-- form -->

          <b-form
            class="auth-login-form mt-2"
            @submit.prevent>
            <!-- email -->
            <b-form-group
              label="Login"
              label-for="login-email">
              <b-form-input
                id="login-email"
                v-model="form.login"
                v-validate="'required'"
                tabindex="1"
                name="login-email"
                :class="{'is-invalid': errors.has('login-email') }"
                placeholder="e-mail" />
            </b-form-group>

            <!-- forgot password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="login-password">Senha</label>
                <b-link :to="{name:'reset-password'}">
                  <small>Esqueceu a senha?</small>
                </b-link>
              </div>
              <b-input-group
                :class="{'is-invalid': errors.has('login-password') }"
                class="input-group-merge">
                <b-form-input
                  id="login-password"
                  v-model="form.password"
                  v-validate="'required'"
                  tabindex="2"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  :class="{'is-invalid': errors.has('login-password') }"
                  name="login-password"
                  placeholder="············" />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility" />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>

            <!-- checkbox -->
            <!--<b-form-group>
  <b-form-checkbox
          id="remember-me"
          v-model="status"
          name="checkbox-1">
    Remember Me
  </b-form-checkbox>
</b-form-group>-->

            <!-- submit buttons -->
            <b-button
              type="submit"
              variant="primary"
              block
              @click="validationForm">
              Logar
            </b-button>
          </b-form>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'

/* configuracoes termo */
import { $themeConfig } from '@themeConfig'

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data () {
    return {
      status: '',
      form: {
        login: null,
        password: null
      },
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      fasorImg: require('@/assets/images/logo/Logo-Fasor_preto.png'),
      // validation rulesimport store from '@/store/index'
    }
  },
  computed: {
    passwordToggleIcon () {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl () {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm () {
      // TODO: no momento sem validator implementado
      this.$validator.validate().then(success => {
        if (success) {
          this.$store.dispatch('auth/loginStore', this.form)
        }
      })
    },
  },
  setup () {
    const { appLogoLogin } = $themeConfig.app

    return {
      appLogoLogin
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
