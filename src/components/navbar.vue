<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="navbar">
    <RouterLink to="/" class="logo">
      <i class="fa-solid fa-layer-group"></i>
      <h1 class="webName">ServiceCat</h1>
    </RouterLink>

    <div class="linkBar">
      <RouterLink to="/create" class="link">創建表單</RouterLink>
      <RouterLink to="/search" class="link">填寫表單</RouterLink>
    </div>

    <div class="iconBar">
      <i class="fa-solid fa-language icon"></i>

      <RouterLink to="/search_backend" class="backendLink">
        歷史紀錄
      </RouterLink>

      <i class="fa-solid fa-gear icon"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
$backgroundColor: #def5e5;
$lightColor: #bcead5;
$darkColor: #9ed5c5;
$themeColor: #8ec3b0;
$textColor: #1e5128;
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: $themeColor;
  padding: 0.5rem 1rem;
  .logo {
    text-decoration: none;
    display: flex;
    .fa-layer-group {
      font-size: 2rem;
      animation: logoColor 1s ease 0s infinite alternate forwards;
    }
    .webName {
      font-size: 2rem;
      animation: logoColor 1s ease 0s infinite alternate forwards;
    }
  }

  .linkBar {
    width: 25vw;
    display: flex;
    justify-content: space-between;
    .link {
      text-decoration: none;
      font-size: 1.6rem;
      color: $textColor;
      padding: 0 0.5rem;
      transition: 0.5s ease;

      &:hover {
        background-color: $textColor;
        color: $lightColor;
      }
    }
  }

  .iconBar {
    width: 25vw;
    display: flex;
    justify-content: space-around;
    .icon {
      font-size: 2rem;
      color: $textColor;
      transition: 0.5s ease;

      &:hover {
        cursor: pointer;
      }
    }

    .backendLink {
      text-decoration: none;
      font-size: 1.6rem;
      color: $textColor;
      padding: 0 0.5rem;
      transition: 0.5s ease;

      &:hover {
        background-color: $textColor;
        color: $lightColor;
      }
    }
  }
}

@keyframes logoColor {
  0% {
    color: #ff9b9b;
  }
  33% {
    color: #ffd6a5;
  }
  66% {
    color: #fffec4;
  }
  100% {
    color: #cbffa9;
  }
}
</style>
