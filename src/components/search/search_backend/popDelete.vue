<script setup>
/* api */
import api from "../../../api/index.js";
/* pinia */
import { useDisplayStore } from "../../../stores/popStore.js";

const displayStore = useDisplayStore();
const { isDisplayDelete } = displayStore;

const { deleteQuiz } = api;

const props = defineProps(["title", "id"]);

const clearQuiz = (id) => {
  deleteQuiz(id)
    .then()
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
</script>

<template>
  <div class="popBackground"></div>

  <div class="pop">
    <i class="fa-solid fa-xmark icon"></i>
    <p>確定要刪除{{ title }}嗎?</p>
    <p class="hint">刪除後無法復原</p>

    <div class="buttonBar">
      <button type="button">取消</button>
      <button type="button" @click="clearQuiz(3)">確認刪除</button>
    </div>
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

  .icon {
    font-size: 1.5rem;
    color: #1e5128;
    position: absolute;
    top: 2%;
    right: 2%;
    transition: 0.5s ease;

    &:hover {
      cursor: pointer;
    }
  }

  p {
    font-size: 1.2rem;
    color: #1e5128;
    text-align: center;
  }

  .hint {
    font-size: 1.2rem;
    color: red;
  }

  .buttonBar {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
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
}
</style>
