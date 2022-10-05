<template>
  <div class="video-wrapper" ref="video-wrapper">
    <div v-if="ended" class="auto-play">
      <p class="mb-1">Next episode in:</p>
      <span class="text-lg">{{ countdown }}</span>
      <p @click="ended = false" class="cancel mt-1">Cancel</p>
    </div>
    <video :src="videoPath" @timeupdate="ended = false" @ended="onEnded" controls :class="{'ended': ended}" ref="video-player" class="video-player" />
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: ['videoPath', 'autoplay'],
  data() {
    return {
      countdown: 5,
      ended: false
    }
  },
  mounted() {
    this.$refs['video-player'].addEventListener('fullscreenchange', function () {
      console.log('hoi')
    })
  },
  watch: {
    videoPath() {
      this.$refs['video-player'].autoplay = true
    }
  },
  methods: {
    async onEnded() {
      if (!this.autoplay) return

      this.ended = true
      for (let i = 0; i < 5; i++) {
        await new Promise(r => setTimeout(r, 1000))
        this.countdown--
      }
      this.countdown = 5
      if (this.ended) {
        this.ended = false
        this.$emit('next')
      }
    }
  }
}
</script>

<style scoped>

</style>