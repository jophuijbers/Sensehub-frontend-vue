<template>
  <div class="video-card">
    <img :src="item.imagePath" alt="" class="video-card__image" draggable="false" loading="lazy">
    <div class="video-card__info">
      <p class="video-card__info__title bold">{{ item.name }}</p>
      <p class="video-card__info__length text-xs text-dark">{{ getLength }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: ['item'],
  computed: {
    getLength() {
      if (this.item.videos.length > 1) {
        return this.item.length + 'ep'
      }
      return this.item.videos[0].duration
    }
  }
}
</script>

<style scoped>

</style>