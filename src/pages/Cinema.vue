<script>
import feather from 'feather-icons'
import CinemaLobby from "./CinemaLobby.vue"
import CinemaPlayer from "./CinemaPlayer.vue"
import { mapGetters } from 'vuex'

export default {
  components: {CinemaLobby, CinemaPlayer},
  computed: {
        ...mapGetters(['getCurrentRoom'])
  },
  mounted() {
    feather.replace()
  } 
  
}
</script>

<template>
  <CinemaLobby v-if="this.getCurrentRoom === null" />
  <CinemaPlayer v-else />
</template>

<style scoped>
</style>
