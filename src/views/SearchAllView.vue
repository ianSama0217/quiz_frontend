<script setup>
import { ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
/* api*/
import api from "../api/index.js";
/* 匯入組件 */
import publicList from "../components/search/search_backend/publicList.vue";
import popDelete from "../components/search/search_backend/popDelete.vue";
/* pinia */
import { useDisplayStore } from "../stores/popStore.js";

const displayStore = useDisplayStore();
const { openDeletePop, closeDeletePop } = displayStore;
const { isPopDelete } = storeToRefs(displayStore);

const { getQuizBackend, deleteQuiz, createQuiz } = api;

/* 搜尋欄位 */
const inputTitle = ref("");
const inputState = ref("");

/*接收API資料*/
const getQuizValues = ref([]);

/*儲存指定問卷id*/
const quizId = ref(0);

const search = (inputTitle, inputState) => {
  getQuizBackend(inputTitle, inputState)
    .then((data) => {
      /* 依日期判定state */

      getQuizValues.value = data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

/* 使用publicList emits取得指定id*/
const handleDeleteQuiz = (id) => {
  quizId.value = id;
  //顯示彈跳視窗
  openDeletePop();
};

/*利用list emits傳入的指定id刪除指定問卷*/
const clearQuiz = () => {
  deleteQuiz(quizId.value)
    .then(() => {
      //刪除成功後，刷新問卷資料
      search(inputTitle.value, inputState.value);
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
  //關閉彈跳視窗
  closeDeletePop();
};

/*載入頁面前先執行一次search，顯示全部資料*/
onBeforeMount(() => {
  search("", "");
});
</script>

<template>
  <div class="body">
    <!-- 搜尋區域 -->
    <div class="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" v-model="inputTitle" />
    </div>

    <!-- 狀態:發布中、尚未開始、已結束、全部("") -->
    <div class="selection">
      <span>狀態</span>
      <select v-model="inputState" name="state" id="">
        <option value="">全部</option>
        <option value="尚未開始">尚未開始</option>
        <option value="發布中">發布中</option>
        <option value="已結束">已結束</option>
      </select>

      <button type="button" @click="search(inputTitle, inputState)">
        搜尋
      </button>
    </div>
    <!-- 搜尋區域 -->

    <!-- 顯示搜尋問卷列表 -->
    <div class="publicList">
      <span v-show="getQuizValues.length == 0"
        >找不到查詢資料 請確認是否輸入正確</span
      >
      <publicList
        :getValue="getQuizValues"
        @deleteQuizItem="handleDeleteQuiz"
      />
    </div>
    <!-- 顯示搜尋問卷列表 -->

    <!-- 彈跳視窗 -->
    <div class="popDelete" v-if="isPopDelete">
      <popDelete :clearQuiz="clearQuiz" :id="quizId" />
    </div>
    <!-- 彈跳視窗 -->

    <!-- 測試區域 -->
    <!-- <h5>getQuizValues:{{ getQuizValues }}</h5>
  <p v-for="(data, index) in getQuizValues" :key="index">
    ///{{ data.title }}///{{ data.state }}///
  </p> -->
  </div>
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
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 1rem 0;
    justify-content: space-around;

    .fa-magnifying-glass {
      font-size: 1.5rem;
      color: #1e5128;
      position: absolute;
      left: 15%;
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
  }

  .selection {
    width: 20vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      font-size: 1.2rem;
    }

    select {
      font-size: 1rem;
      padding: 0.2rem;
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

  .publicList {
    min-height: 60vh;
    span {
      font-size: 1.4rem;
    }
  }
}
</style>
