<template>
  <div class="upload-page">
    <div class="form">
      <div class="mb-3">
        <p class="text-lg bold mb-1">Upload</p>
      </div>
      <div class="input-group">
        <p class="input-group__label">Name*</p>
        <input v-model="name" type="text" placeholder="Willems kantine..." class="input-group__input">
      </div>

      <div class="input-group">
        <p class="input-group__label">Banner image</p>
        <input @change="uploadImage" type="file" accept="image/*" class="input-group__input">
      </div>

      <div class="input-group">
        <p class="input-group__label">Tags<span class="text-dark ml-1">(separate by spaces)</span></p>
        <input v-model="tags" type="text" placeholder="Willems kantine..." class="input-group__input">
      </div>

      <Button @submit="submit" :loadingState="isLoading">Upload</Button>
    </div>
    <VideoCard :item="video" />
  </div>
</template>

<script>
import Button from "../components/Button";
import {UPLOAD} from "../store/actions.type";
import VideoCard from "../components/VideoCard";
export default {
  name: "Upload",
  components: {VideoCard, Button},
  data() {
    return {
      isLoading: false,
      name: null,
      image: null,
      tags: null
    }
  },
  computed: {
    video() {
      const image = this.image ? URL.createObjectURL(this.image) : ''
      return {
        name: this.name,
        imagePath: image,
        videos: [{ duration: 'xxx'}]
      }
    }
  },
  methods: {
    uploadImage(e) {
      this.image = e.target.files[0]
    },
    async submit() {
      if(!this.name) return
      this.isLoading = true
      const formData = new FormData()
      formData.append('name', this.name)
      if (this.image) formData.append('image', this.image)
      if (this.tags) formData.append('tags', this.tags)
      await this.$store.dispatch(UPLOAD, formData).then((video) => {
        this.$router.push({name: 'watch', query: {v: video.id}})
      })
      this.isLoading = false
    }
  }
}
</script>