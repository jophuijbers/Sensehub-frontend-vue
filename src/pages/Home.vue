<template>
  <div class="home-page">
    <input v-model="searchValue" placeholder="Title, Tag" class="search-bar" type="text">
    <div v-if="!isLoading">
      <div v-if="!searchValue">
        <VideoCarrousel
          v-for="(item, n) in carousels" :key="n"
          :title="item.title"
          :tag="item.tag"
        />
      </div>

      <div>
        <div class="mb-2">
          <span class="text-lg bold">All movies</span>
          <span class="text-dark ml-1">{{ getCollections.length }}</span>
        </div>
        <div class="video-grid">
          <VideoCard
            v-for="collection in getCollections" :key="collection.id"
            @click.native="onWatch(collection)"
            :item="collection"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VideoCard from "@/components/VideoCard";
import {FETCH_COLLECTIONS} from "@/store/actions.type";
import VideoCarrousel from "../components/VideoCarousel";

export default {
  name: "Home",
  components: {VideoCarrousel, VideoCard},
  data() {
    return {
      isLoading: false,
      searchValue: null,
      carousels: [
        { title: 'Recently added', tag: 'recent' },
        { title: 'Nederlands', tag: 'Nederlands' },
        { title: 'War', tag: 'War' },
        { title: 'Cartoons', tag: 'Cartoons' },
        { title: 'Action', tag: 'Action' },
        { title: 'Comedy', tag: 'Comedy' },
        { title: 'Anime', tag: 'Anime' },
        { title: 'Sci-fi', tag: 'Sci-fi' },
        { title: 'Documentary', tag: 'Documentary' }
      ]
    }
  },
  async created() {
    this.isLoading = true
    await this.$store.dispatch(FETCH_COLLECTIONS, {})
    this.isLoading = false
  },
  methods: {
    onWatch(collection) {
      this.$router.push({name: 'watch', query: {v: collection.id}})
    }
  },
  computed: {
    ...mapGetters(['getCollections'])
  },
  watch: {
    async searchValue() {
      await this.$store.dispatch(FETCH_COLLECTIONS, this.searchValue)
    }
  }
}
</script>