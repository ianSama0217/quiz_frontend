<script setup>
import { ref, onBeforeMount, watch } from "vue";
import api from "../api/index.js";
/* 匯入組件 */
import resList from "../components/search/resList.vue";

const { getQuizFrontend } = api;

const inputTitle = ref("");
//search取得的所有資料
const getQuizValues = ref([]);

console.log(getQuizValues);

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
  <div class="body">
    <!-- 搜尋區域 -->
    <div class="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" v-model="inputTitle" />

      <button type="button" @click="search(inputTitle, inputState)">
        搜尋
      </button>
    </div>
    <!-- 搜尋區域 -->

    <!-- 顯示搜尋問卷列表 -->
    <div class="resList">
      <resList :getValue="getQuizValues" />
    </div>
    <!-- 顯示搜尋問卷列表 -->

    <!-- 切換頁面 -->
    <div class="changePage">
      <changePageBtn @pageItem="handleChangePage" :quizLength="getQuizValues" />
    </div>
    <!-- 切換頁面 -->
  </div>

  <!-- 測試區域 -->
  <!-- <p v-for="(data, index) in getQuizValues" :key="index">
    ///{{ data.title }}///{{ data.start_time }}///{{ data.end_time }}
  </p>
  <h5>getQuizValues:{{ getQuizValues }}</h5> -->
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .searchBar {
    width: 45vw;
    display: flex;
    align-items: center;
    position: relative;
    margin: 1rem 0;
    justify-content: space-around;

    .fa-magnifying-glass {
      font-size: 1.5rem;
      color: #1e5128;
      position: absolute;
      left: 7%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    input {
      outline: 2px solid #1e5128;
      color: #1e5128;
      width: 35vw;
      height: 6vh;
      font-size: 1.4rem;
      padding: 0.2rem 1rem 0.2rem 3rem;
      border: none;
      border-radius: 20px;
    }

    button {
      background-color: #1e5128;
      text-decoration: none;
      font-size: 1.2rem;
      color: #bcead5;
      border: 2px solid #1e5128;
      border-radius: 8px;
      padding: 0.3rem 0.5rem;
      box-shadow: 0 10px 6px -6px #8ec3b0;
      transition: 0.3s ease;

      &:hover {
        cursor: pointer;
        background-color: #def5e5;
        color: #1e5128;
      }
    }
  }

  .resList {
    min-height: 60vh;
  }

  .changePage {
    position: sticky;
    bottom: 5%;
  }
}
</style>
