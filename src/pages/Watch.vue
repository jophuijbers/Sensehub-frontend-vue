<template>
  <div>
    <div v-if="!isLoading" class="watch">

      <VideoPlayer :video-path="videoPath" :autoplay="autoplay" @next="selectNext" />

      <div class="info">
        <div class="row">
          <span class="text-lg bold">
            {{ current.name }}
          </span>
          <div v-if="user.isAdmin" class="edit">
            <img @click="editVideo" src="icons/pen.svg" alt="">
            <img @click="deleteVideo" src="icons/trash-can.svg" alt="">
          </div>
        </div>

        <p class="text-md text-dark">Duration: {{ current.duration }}</p>
        <p v-if="upload.tags.length" class="text-md text-dark">
          <span>Tags: </span>
          <span v-for="(tag, index) in upload.tags" :key="index">{{ tag }}{{ index === upload.tags.length-1 ? '' : ', ' }}</span>
        </p>

        <VideoButtons v-if="upload.length > 1" @prev="selectPrev" @next="selectNext" />
      </div>

      <div v-if="upload.length > 1" :key="upload.id" class="table-scroll-x">
        <table class="mt-1">
          <tr>
            <th class="grow text-lg">{{ upload.name }}</th>
            <th class="text-dark">{{ upload.videos.length }}ep</th>
          </tr>
          <tr v-for="(video, index) in upload.videos" :key="index" @click="selectVideo(video)">
            <td class="hover" :class="{ 'gray': video.id === current.id || video.hasWatched }">
              <p>{{ video.name }}</p>
            </td>
            <td class="text-dark">
              <p>{{ video.duration }}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getToken} from "../services/local_storage.service";
import {FETCH_UPLOAD} from "@/store/actions.type";
import {DELETE_UPLOAD} from "../store/actions.type";
import VideoButtons from "../components/VideoButtons";
import VideoPlayer from "../components/VideoPlayer";
import {MARK_AS_WATCHED} from "../store/mutations.type";

export default {
  name: "Watch",
  components: {VideoPlayer, VideoButtons},
  data() {
    return {
      isLoading: false,
      current: null
    }
  },
  async created() {
    this.isLoading = true
    await this.$store.dispatch(FETCH_UPLOAD, this.$route.query.v)
    this.selectVideo(this.upload.videos[0])
    this.isLoading = false
  },
  methods: {
    selectVideo(video) {
      this.$store.commit(MARK_AS_WATCHED, video.id)
      this.current = video
      window.scrollTo(0,0)
    },
    selectPrev() {
      const prevIndex = this.currentIndex - 1
      if (prevIndex < 0) return
      const prev = this.upload.videos[prevIndex]
      this.selectVideo(prev)
    },
    selectNext() {
      const nextIndex = this.currentIndex + 1
      if (nextIndex === this.upload.length) return
      const prev = this.upload.videos[nextIndex]
      this.selectVideo(prev)
    },
    deleteVideo() {
      const text = `Are you sure you want to delete ${this.upload.name}`
      if (confirm(text)) {
        this.$store.dispatch(DELETE_UPLOAD, this.upload.id).then(() => {
          this.$router.push({ name: 'home' })
        })
      }
    },
    editVideo() {
      this.$router.push({name:'edit', params: {id: this.upload.id}})
    }
  },
  computed: {
    ...mapGetters(['upload', 'user']),
    currentIndex() {
      return this.upload.videos.indexOf(this.current)
    },
    autoplay() {
      return this.upload.length > 1 && (this.currentIndex + 1) < this.upload.length
    },
    videoPath() {
      return this.current.path + `?token=${getToken()}`
    }
  }
}
</script>
