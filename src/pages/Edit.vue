<template>
  <div class="upload-page">
    <div v-if="upload" class="form">
      <div class="mb-3">
        <p class="text-lg bold mb-1">Edit: {{ upload.name }}</p>
      </div>
      <div class="input-group">
        <p class="input-group__label">Name</p>
        <input v-model="name" type="text" :placeholder="upload.name" class="input-group__input">
      </div>

      <div class="input-group">
        <p class="input-group__label">Banner image</p>
        <input @change="uploadImage" type="file" accept="image/*" class="input-group__input">
      </div>

      <div class="input-group">
        <p class="input-group__label">Tags<span class="text-dark ml-1">(separate by spaces)</span></p>
        <input v-model="tags" type="text" :placeholder="getTags" class="input-group__input">
      </div>

      <Button @submit="submit" :loadingState="isLoading">Save changes</Button>
    </div>
    <VideoCard :item="video" />
  </div>
</template>

<script>
import Button from "../components/Button";
import {FETCH_UPLOAD, PATCH_UPLOAD} from "../store/actions.type";
import {mapGetters} from "vuex";
import VideoCard from "../components/VideoCard";

export default {
  name: "Edit",
  components: {VideoCard, Button},
  data() {
    return {
      isLoading: false,
      name: null,
      image: null,
      tags: null
    }
  },
  async created() {
    if (this.upload) return
    await this.$store.dispatch(FETCH_UPLOAD, this.$route.params.id)
  },
  methods: {
    uploadImage(e) {
      this.image = e.target.files[0]
    },
    async submit() {
      this.isLoading = true
      const formData = new FormData()
      if (this.name) formData.append('name', this.name)
      if (this.image) formData.append('image', this.image)
      if (this.tags) formData.append('tags', this.tags)
      await this.$store.dispatch(PATCH_UPLOAD, {id: this.upload.id, payload: formData}).then((video) => {
        this.$router.push({name: 'watch', query: {v: video.id}})
      })
      this.isLoading = false
    }
  },
  computed: {
    video() {
      return {
        name: !this.name || this.name === '' ? this.upload.name : this.name,
        imagePath: this.image ? URL.createObjectURL(this.image) : this.upload.imagePath,
        videos: [{ duration: 'xxx'}]
      }
    },
    getTags() {
      let tags = ''
      this.upload.tags.forEach(tag => {
        tags += `${tag} `
      })
      return tags
    },
    ...mapGetters(['upload'])
  }
}
</script>

<style scoped>

</style>