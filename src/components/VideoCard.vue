<template>
  <div class="video-card">
    <img :src="item.imagePath" alt="" class="video-card__image" draggable="false" loading="lazy">
    <div class="video-card__info">
      <p class="video-card__info__title bold">{{ item.name }}</p>
      <p class="video-card__info__length text-xs text-dark">{{ item.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: ['item']
}
</script>

<style scoped>

</style>