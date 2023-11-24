<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
/* api */
import api from "../../api/index.js";
/* pinia */
import { useDisplayStore } from "../../stores/popStore.js";

const displayStore = useDisplayStore();
const { closeSavePop } = displayStore;

const props = defineProps(["saveQuiz"]);
</script>

<template>
  <div class="popBackground"></div>

  <div class="pop">
    <p>問卷儲存成功</p>
    <p>請至歷史紀錄查看</p>

    <button type="button" @click="closeSavePop">
      <RouterLink to="/search_backend">確認</RouterLink>
    </button>
  </div>
</template>

<style scoped lang="scss">
.popBackground {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #1e5128;
  opacity: 0.6;
  position: fixed;
  top: 0%;
  left: 0%;
}
.pop {
  background-color: #8ec3b0;
  padding: 2rem;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-shadow: 5px 10px 6px -6px #1e5128;

  p {
    font-size: 1.2rem;
    color: #1e5128;
    text-align: center;
  }

  button {
    background-color: #def5e5;
    text-decoration: none;
    font-size: 1.2rem;
    color: #1e5128;
    border: 1px solid #1e5128;
    border-radius: 8px;
    padding: 0.2rem;
    margin: 0 1rem;
    transition: 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #1e5128;
      color: #bcead5;
    }
  }
}
</style>
