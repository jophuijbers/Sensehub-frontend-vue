<template>
  <div class="video-buttons">
    <div v-if="showPrev" @click="prev" class="prev">
      <img src="icons/arrow-left.svg" alt="">
      <span>Previous</span>
    </div>
    <div v-if="showNext" @click="next" class="next">
      <span>Next</span>
      <img src="icons/arrow-right.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoButtons",
  props: ['hide'],
  methods: {
    prev() {
      this.$emit('prev')
    },
    next() {
      this.$emit('next')
    }
  },
  computed: {
    showPrev() {
      return this.hide !== 'prev'
    },
    showNext() {
      return this.hide !== 'next'
    }
  }
}
</script>

<style scoped>

</style>