<template>
  <div class="nav-bar">
    <div class="nav-bar__content">
      <div class="nav-bar__main">
        <router-link :to="{ name: 'home' }">
          <img src="logo.svg" alt="">
        </router-link>
      </div>
      <img @click="onHamburgerClick" ref="hamburger" src="icons/bars.svg" class="hamburger" alt="">
      <div class="nav-bar__items" :class="{'dropdown': showDropdown}">
        <div class="nav-bar__items__link">
          <a href="https://docs.google.com/spreadsheets/d/1a29YOR_nIMIFddnmBEm3yQW-2lBIMUqtfEFCGpSlVK8/edit?usp=sharing" target="_blank">Requests</a>
        </div>
        <div v-if="user.isAdmin" class="nav-bar__items__link">
          <router-link :to="{ name: 'upload' }">Upload</router-link>
        </div>
        <div v-if="user.isAdmin" class="nav-bar__items__link">
          <router-link :to="{ name: 'admin' }">Admin</router-link>
        </div>
        <div class="nav-bar__items__link">
          <a @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LOGOUT} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      showDropdown: false
    }
  },
  watch: {
    $route() {
      this.showDropdown = false
    }
  },
  methods: {
    onHamburgerClick() {
      this.showDropdown = !this.showDropdown
    },
    logout() {
      this.$store.dispatch(LOGOUT)
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>