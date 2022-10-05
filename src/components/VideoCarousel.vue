<template>
  <div>
    <div v-if="showCarousel" class="video-carousel">
      <div class="video-carousel__header mb-2">
        <span class="text-lg bold">{{ title }}</span>
        <span class="text-dark ml-1">{{ videos.length }}</span>
      </div>
      <div class="wrapper">
        <transition :name="transition">
          <div ref="grid" :key="indexes[0]" class="video-grid">
            <VideoCard
                v-for="index in indexes"
                :key="index"
                @click.native="goToVideoPage(videos[index])"
                :item="videos[index]"
            />
          </div>
        </transition>
        <button @click="shiftLeft" class="prev" ref="prev"><img src="icons/chevron-left.svg" alt=""></button>
        <button @click="shiftRight" class="next" ref="next"><img src="icons/chevron-right.svg" alt=""></button>
      </div>
    </div>
  </div>
</template>

<script>
import {FETCH_UPLOADS_WITH_TAG} from "@/store/actions.type";
import VideoCard from "./VideoCard";

export default {
  name: "VideoCarrousel",
  components: {VideoCard},
  props: ['title', 'tag'],
  data() {
    return {
      videos: null,
      indexes: [],
      transition: ''
    }
  },
  async mounted() {
    this.videos = await this.$store.dispatch(FETCH_UPLOADS_WITH_TAG, this.tag)
    if (this.showCarousel) {
      setTimeout(()=>{
        this.$nextTick(()=>{
          this.setIndexes()
        })
      }, 0)
      window.addEventListener("resize", this.setIndexes);
    }
  },
  methods: {
    setIndexes() {
      const grid = this.$refs.grid
      if (!grid) return
      const columnCount = window.getComputedStyle(grid).gridTemplateColumns.split(' ').length
      let indexesLength = columnCount
      if (this.videos.length <= columnCount) {
        this.hideButtons()
        indexesLength = this.videos.length
      }
      this.indexes = Array.from({length: indexesLength}, (v, i) => i)
    },
    shiftLeft() {
      this.hideButtons()
      this.transition = 'slide-left'
      const prev = []
      let index = this.indexes[0] - this.indexes.length
      for (let i = 0; i < this.indexes.length; i++) {
        if(index <= 0) index += this.videos.length
        if(index >= this.videos.length) index = 0
        prev.push(index)
        index++
      }
      this.indexes = prev
      this.showButtons()
    },
    shiftRight() {
      this.hideButtons()
      this.transition = 'slide-right'
      const next = []
      let lastIndex = this.indexes[this.indexes.length -1]
      for (let i = 0; i < this.indexes.length; i++) {
        lastIndex++
        if(lastIndex >= this.videos.length) lastIndex = 0
        next.push(lastIndex)
      }
      this.indexes = next
      this.showButtons()
    },
    goToVideoPage(video) {
      this.$router.push({name: 'watch', query: {v: video.id}})
    },
    hideButtons() {
      this.$refs.next.style.display = 'none'
      this.$refs.prev.style.display = 'none'
    },
    showButtons() {
      setTimeout(()=>{
        this.$refs.next.style.display = 'block'
        this.$refs.prev.style.display = 'block'
      }, 1200)
    }
  },
  computed: {
    showCarousel() {
      return this.videos && this.videos.length
    }
  }
}
</script>

<style scoped>

</style>