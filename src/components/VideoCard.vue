<template>
  <div class="video-card">
    <div class="video-card__image">
      <img :src="item.imagePath" alt="" class="" draggable="false" loading="lazy">
      <LikeButton :active-state="isInWatchList" @add="onAddToWatchList" @remove="onRemoveFromWatchList" />
    </div>
    <div class="video-card__info">
      <p class="video-card__info__title bold">{{ item.name }}</p>
      <p class="video-card__info__length text-xs text-dark">{{ item.length }}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import LikeButton from "@/components/LikeButton";
import {ADD_TO_WATCH_LIST, REMOVE_FROM_WATCH_LIST} from "@/store/actions.type";

export default {
  name: "VideoCard",
  components: {LikeButton},
  props: ['item'],

  methods: {
    async onAddToWatchList() {
      await this.$store.dispatch(ADD_TO_WATCH_LIST, this.item.id)
    },

    async onRemoveFromWatchList() {
      await this.$store.dispatch(REMOVE_FROM_WATCH_LIST, this.item.id)
    }
  },

  computed: {
    ...mapGetters(['getWatchList']),

    isInWatchList() {
      return this.getWatchList.some(c => c.id === this.item.id)
    }
  }
}
</script>

<style scoped>

</style>