<template>
  <button @click="submit" type="submit" class="button">
    <div v-if="loadingState" class="spinner"></div>
    <span v-if="loadingState">Loading...</span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ['loadingState'],
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>