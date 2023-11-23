<script setup>
import { ref, onBeforeMount } from "vue";
import api from "../api/index.js";
/* 匯入組件 */
import resList from "../components/search/resList.vue";

const { getQuizFrontend, getQuizInfo } = api;

const inputTitle = ref("");

const getQuizValues = ref([]);

const search = (inputTitle) => {
  getQuizFrontend(inputTitle)
    .then((data) => {
      getQuizValues.value = data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

/*載入頁面前先執行一次search，顯示全部資料*/
onBeforeMount(() => {
  search("");
});
</script>

<template>
  <!-- 搜尋區域 -->
  <div class="searchBar">
    <input type="search" v-model="inputTitle" />

    <label for="">開始日期</label>
    <input type="date" />
    <label for="">結束日期</label>
    <input type="date" />
    <button type="button" @click="search(inputTitle)">搜尋</button>
  </div>
  <!-- 搜尋區域 -->

  <!-- 顯示搜尋問卷列表 -->
  <resList :getValue="getQuizValues" />
  <!-- 顯示搜尋問卷列表 -->

  <!-- 測試區域 -->
  <!-- <p v-for="(data, index) in getQuizValues" :key="index">
    ///{{ data.title }}///{{ data.start_time }}///{{ data.end_time }}
  </p>
  <h5>getQuizValues:{{ getQuizValues }}</h5> -->
</template>
