<template>
    <div>
      <NavBar style="top: 0;"/>
      <router-view />
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar";
  export default {
    name: "CinemaLayout",
    components: {NavBar}
  }
  </script>
  
  <style scoped>
  
  </style>