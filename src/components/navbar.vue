<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="navbar">
    <RouterLink to="/">首頁</RouterLink>
    <RouterLink to="/create">創表單</RouterLink>
    <RouterLink to="/search">填寫表單</RouterLink>
    <RouterLink to="/search_backend">歷史紀錄</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
}
</style>
