<template>
  <div class="row">
    <div class="col">
      <vue-google-autocomplete id="map"
                               country="br"
                               classname="form-control"
                               :types="['establishment','address']"
                               :value="namePreview"
                               placeholder="informe o endereço"
                               @placechanged="changed" />
    </div>
  </div>
</template>

<script>
// google
import VueGoogleAutocomplete from "vue-google-autocomplete"

export default {
  name: 'AddressForm',
  components: {
    VueGoogleAutocomplete
  },
  props: {
    propAddress: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  computed: {
    namePreview () {
      if (Object.keys(this.propAddress).length) {
        const { place: { name, formatted_address } } = this.propAddress

        return name + ' - ' + formatted_address
      }

      return ''
    }
  },
  methods: {
    changed (addressData, placeResultData, id  ) {
      this.$emit('placechanged', addressData, placeResultData, id)
    }
  }
}
</script>

<style lang="scss">
.pac-container {
  z-index: 10000;
}
</style>
