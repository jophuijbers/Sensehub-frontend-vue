<template>
  <div class="login-page">
    <form @submit.prevent="submit" class="form">
<!--      <p class="text-lg bold">Log in</p>-->

      <img src="/logo.svg" alt="" class="mb-2">
      
      <div class="input-group">
<!--        <p class="input-group__label">Username</p>-->
        <input v-model="username" type="text" placeholder="username" class="input-group__input">
      </div>

      <div class="input-group">
<!--        <p class="input-group__label">Password</p>-->
        <input v-model="password" type="password" placeholder="password" class="input-group__input">
      </div>

      <Button :loading-state="isLoading">Login</Button>
    </form>
  </div>
</template>

<script>
import {LOGIN} from "@/store/actions.type";
import Button from "@/components/Button";

export default {
  name: "Login",
  components: {Button},
  data() {
    return {
      isLoading: false,
      username: null,
      password: null
    }
  },
  methods: {
    async submit() {
      if(this.username && this.password) {
        this.isLoading = true
        await this.$store.dispatch(LOGIN, {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push({ name: 'home'})
        }).catch(() => {
          this.isLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;

  filter: var(--filter-text-color);
}
</style>