<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
/* api */
import api from "../../api/index.js";
/* pinia */
import { useDisplayStore } from "../../stores/popStore.js";

const displayStore = useDisplayStore();
const { closePostPop } = displayStore;

const props = defineProps(["postQuiz"]);
const emits = defineEmits(["startDate", "endDate"]);

const emitStartDate = (event) => {
  const startDate = event.target.value;
  emits("startDate", startDate);
};

const emitEndDate = (event) => {
  const endDate = event.target.value;
  emits("endDate", endDate);
};
</script>

<template>
  <div class="popBackground"></div>

  <div class="pop">
    <i class="fa-solid fa-xmark icon" @click="closePostPop"></i>
    <label>選擇發布日期</label>
    <input type="date" @input="emitStartDate" />
    <label>選擇結束日期</label>
    <input type="date" @input="emitEndDate" />
    <div class="buttonBar">
      <button type="button" @click="closePostPop">取消</button>
      <button type="button" @click="postQuiz">發布</button>
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

  label {
    font-size: 1.2rem;
    color: #1e5128;
    text-align: center;
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
