<template>
  <div class="row">
    <div class="col">
      <b-form @change="changeForm">
        <b-form-group
          label="Nome"
          label-for="user-form-name">
          <b-input-group class="input-group-merge"
                         :class="{ 'is-invalid': errors.has('user-form-name') }">
            <b-input-group-prepend is-text>
              <feather-icon icon="UserIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="user-form-name"
              v-model="user.name"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('user-form-name') }"
              name="user-form-name"
              placeholder="Nome" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="E-mail"
          label-for="user-form-email">
          <b-input-group class="input-group-merge"
                         :class="{ 'is-invalid': errors.has('user-form-email') }">
            <b-input-group-prepend is-text>
              <feather-icon icon="MailIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="user-form-email"
              v-model="user.mail"
              type="email"
              :class="{ 'is-invalid': errors.has('user-form-email') }"
              name="user-form-email"
              placeholder="E-mail" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="Login"
          label-for="user-form-login">
          <b-input-group class="input-group-merge"
                         :class="{ 'is-invalid': errors.has('user-form-login') }">
            <b-input-group-prepend is-text>
              <feather-icon icon="UserIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="user-form-login"
              v-model="user.login"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('user-form-login') }"
              name="user-form-login"
              placeholder="Login" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="Senha"
          label-for="user-form-password">
          <b-input-group class="input-group-merge"
                         :class="{ 'is-invalid': errors.has('user-form-password') }">
            <b-input-group-prepend is-text>
              <feather-icon icon="KeyIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="user-form-password"
              v-model="user.new_password"
              v-validate="!$route.params.id ? 'required': ''"
              :class="{ 'is-invalid': errors.has('user-form-password') }"
              name="user-form-password"
              type="password"
              placeholder="Senha" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="Grupo"
          label-for="user-form-role">
          <b-input-group class="input-group-merge"
                         :class="{ 'is-invalid': errors.has('user-form-role') }">
            <b-input-group-prepend is-text>
              <feather-icon icon="UserIcon" />
            </b-input-group-prepend>
            <b-form-select
              id="user-form-role"
              v-model="user.role"
              :class="{ 'is-invalid': errors.has('user-form-role') }"
              name="user-form-role"
              value-field="_id"
              text-field="name"
              :options="[{ name: 'Admin', _id: 'admin' }, { name: 'Lider', _id: 'leader' }, { name: 'Técnico', _id: 'guest' }]" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          label="Status"
          label-for="user-form-status">
          <b-input-group class="input-group-merge"
                         :class="{ 'is-invalid': errors.has('user-form-status') }">
            <b-input-group-prepend is-text>
              <feather-icon icon="TagIcon" />
            </b-input-group-prepend>
            <b-form-select
              id="user-form-status"
              v-model="user.status"
              :class="{ 'is-invalid': errors.has('user-form-status') }"
              name="user-form-status"
              value-field="value"
              text-field="label"
              :options="[
                {
                  label: 'Ativo',
                  value: 'ACTIVE'
                },
                {
                  label: 'Inativo',
                  value: 'INACTIVE'
                }
              ]" />
          </b-input-group>
        </b-form-group>
      </b-form>
    </div>
    <div class="col align-content-center text-center">
      <h3>Foto de perfil</h3>
      <b-avatar
        size="15rem"
        :src="user.image || require('@/assets/images/avatars/user.png')" />
      <br>
      <br>
      <input id="teste" type="file" accept=".jpg, .jpeg, .png" @change="onFileChange">
    </div>
  </div>
</template>

<script>
/* libraries */
import { mapGetters } from 'vuex'

export default {
  name: "UsersForm",
  props: {
    propUser: {
      default: () => ({}),
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      roles: 'admin/roles'
    })
  },
  watch: {
    propUser () {
      this.boot()
    }
  },
  created () {
    this.boot()
  },
  inject: ['$validator'],
  data () {
    return {
      bkp: {
        password: null
      },
      user: {
        name: '',
        mail: '',
        login: '',
        image: '',
        password: '',
        new_password: '',
        role: 'admin',
        status: 'ACTIVE'
      }
    }
  },
  methods: {
    boot () {
      if (Object.values(this.propUser).length) {
        Object.assign(this.user, this.propUser)

        if (typeof this.user.role == "object") {
          this.user.role = this.user.role._id
        }
      }
    },
    changeForm () {
      const { new_password, password } = this.user

      // deixamos a senha atual como backup
      this.bkp.password = `${ password }`

      // se houver uma senha nova irá ser atualizado
      if (new_password) {
        this.user.password = `${ new_password }`
      } else {
        this.user.password = `${ this.bkp.password }`
      }

      this.$emit('onChangeForm', this.user)
    },
    onFileChange (e) {
      const file = e.target.files[0]
      this.user.file = e.target.files
      this.user.image = URL.createObjectURL(file)

      this.$emit('onChangeForm', this.user)
    }
  }
}
</script>

<style scoped>

</style>
