<template>
  <div class="main-layout">
    <NavBar />
    <router-view id="page" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "MainLayout",
  components: {NavBar}
}
</script>

<style scoped>

</style>