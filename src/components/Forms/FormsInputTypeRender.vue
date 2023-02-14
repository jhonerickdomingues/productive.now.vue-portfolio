<template>
  <div>
    <div v-if="type=='short_text'">
      <b-input placeholder="Descrição do formulário..." />
    </div>
    <div v-if="type=='long_text'">
      <b-textarea placeholder="Descrição do formulário..." />
    </div>
    <div v-if="type=='unique_option'">
      <b-form-radio-group v-slot="{ ariaDescribedby }">
        <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="A">
          Option A
        </b-form-radio>
        <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">
          Option B
        </b-form-radio>
      </b-form-radio-group>
    </div>
    <div v-if="type=='many_option'">
      <b-form-checkbox-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox :aria-describedby="ariaDescribedby" name="some-radios" value="A">
          Option A
        </b-form-checkbox>
        <b-form-checkbox :aria-describedby="ariaDescribedby" name="some-radios" value="B">
          Option B
        </b-form-checkbox>
      </b-form-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormsInputTypeRender",
  props: {
    type: {
      type: String,
      default: () => "",
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
