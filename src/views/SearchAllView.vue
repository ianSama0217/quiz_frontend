<script setup>
import { ref } from "vue";
import api from "../api/index.js";
/* 匯入組件 */

const { getQuizFrontend, getQuizBackend, getQuizInfo } = api;

const inputTitle = ref("");

const getQuizValue = ref([]);

const search = (inputTitle) => {
  getQuizFrontend(inputTitle)
    .then((data) => {
      getQuizValue.value.push(data);
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
</script>

<template>
  <!-- 搜尋區域 -->
  <div class="searchBar">
    <input type="search" v-model="inputTitle" />

    <button type="button" @click="search(inputTitle)">搜尋</button>
  </div>
  <!-- 搜尋區域 -->

  <h1>測試搜尋功能:</h1>
  <p>///{{ getQuizValue[0] }}///</p>
  <p>///{{ getQuizValue[1] }}///</p>
  <p>///{{ getQuizValue[2] }}///</p>
  <p>///{{ getQuizValue[3] }}///</p>
</template>
