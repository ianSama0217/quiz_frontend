<script setup>
import { RouterLink, RouterView } from "vue-router";
import navbar from "./components/navbar.vue";
import foo from "./components/foo.vue";
</script>

<template>
  <navbar />
  <RouterView />
  <foo />
</template>

<style scoped lang="scss"></style>
