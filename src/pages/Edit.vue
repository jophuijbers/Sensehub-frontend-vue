<template>
  <div class="upload-page">
    <div v-if="getCollection" class="form">
      <div class="mb-3">
        <p class="text-lg bold mb-1">Edit: {{ getCollection.name }}</p>
      </div>
      <div class="input-group">
        <p class="input-group__label">Name</p>
        <input v-model="name" type="text" :placeholder="getCollection.name" class="input-group__input">
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
import {FETCH_COLLECTION, UPDATE_COLLECTION} from "../store/actions.type";
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
    if (this.getCollection) return
    await this.$store.dispatch(FETCH_COLLECTION, this.$route.params.id)
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
      await this.$store.dispatch(UPDATE_COLLECTION, {id: this.getCollection.id, payload: formData}).then((video) => {
        this.$router.push({name: 'watch', query: {v: video.id}})
      })
      this.isLoading = false
    }
  },
  computed: {
    video() {
      return {
        name: !this.name || this.name === '' ? this.getCollection.name : this.name,
        imagePath: this.image ? URL.createObjectURL(this.image) : this.getCollection.imagePath,
        videos: [{ duration: 'xxx'}]
      }
    },
    getTags() {
      let tags = ''
      this.getCollection.tags.forEach(tag => {
        tags += `${tag} `
      })
      return tags
    },
    ...mapGetters(['getCollection'])
  }
}
</script>

<style scoped>

</style>