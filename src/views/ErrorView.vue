<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <p>網址輸入錯誤 請確認網址是否輸入正確</p>
  <div class="body">
    <RouterLink to="/" class="link">回首頁</RouterLink>
  </div>
</template>

<style scoped lang="scss">
$backgroundColor: #def5e5;
$lightColor: #bcead5;
$darkColor: #9ed5c5;
$themeColor: #8ec3b0;
$textColor: #1e5128;
p {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: $textColor;
  text-align: center;
}
.body {
  margin-top: 1rem;
  height: 65vh;
  background-image: url("../../public/error.jpg");
  background-size: cover;
  filter: sepia();
  display: flex;
  justify-content: center;
  align-items: center;

  .link {
    background-color: $textColor;
    text-decoration: none;
    font-size: 2rem;
    color: $lightColor;
    border: 2px solid $textColor;
    border-radius: 8px;
    padding: 0.5rem;
    margin: 0 1rem;
    box-shadow: 0 10px 6px -6px $themeColor;
    transition: 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: $backgroundColor;
      color: $textColor;
      border: 2px solid $textColor;
    }
  }
}
</style>
