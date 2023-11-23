<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="foo">
    <div class="linkBar">
      <RouterLink to="/" class="link">使用條款與條件</RouterLink>
      <RouterLink to="/" class="link">隱私權保護政策</RouterLink>
    </div>

    <div class="companyInfo">
      <div class="logoBar">
        <i class="fa-solid fa-layer-group"></i>
        <span>
          ServiceCat |
          <i class="fa-solid fa-mobile-screen-button"></i> 09-12345678</span
        >
      </div>
      <p>Copyright © 2023 ian | Web Design</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
$backgroundColor: #def5e5;
$lightColor: #bcead5;
$darkColor: #9ed5c5;
$themeColor: #8ec3b0;
$textColor: #1e5128;

.foo {
  background-color: $themeColor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw 5vw;
  .linkBar {
    width: 25vw;
    display: flex;
    justify-content: space-between;
    .link {
      text-decoration: none;
      color: $textColor;
    }
  }

  .companyInfo {
    .logoBar {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid $textColor;
      color: $textColor;
    }
    p {
      margin-top: 0.5rem;
      color: $textColor;
    }
  }
}
</style>
