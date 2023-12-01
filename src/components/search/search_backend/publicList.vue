<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(["getValue"]);
const emits = defineEmits(["deleteQuizItem"]);

const emitDeleteQuiz = (id) => {
  emits("deleteQuizItem", id);
};

const turnToEditView = (data) => {
  router.push({ name: "edit", params: { id: data.id, title: data.title } });
};

const turnToWriteView = (data) => {
  router.push({ name: "write", params: { id: data.id, title: data.title } });
};

const turnToReadQuizView = (data) => {
  router.push({ name: "readquiz", params: { id: data.id, title: data.title } });
};

const turnToReadDataView = (data) => {
  router.push({ name: "readdata", params: { id: data.id, title: data.title } });
};
</script>

<template>
  <div class="resList" v-for="(data, index) in getValue">
    <span>{{ index + 1 }}</span>
    <span class="title">{{ data.title }}</span>
    <span class="state">{{ data.state }}</span>

    <!-- 尚未開始顯示的icon -->
    <div class="iconBar" v-show="data.state === '尚未開始'">
      <i
        @click="turnToEditView(data)"
        class="fa-regular fa-pen-to-square icon"
        title="編輯問卷"
      ></i>

      <button @click="emitDeleteQuiz(data.id)" type="button" title="刪除問卷">
        <i class="fa-regular fa-trash-can icon"></i>
      </button>
    </div>
    <!-- 尚未開始顯示的icon -->

    <!-- 發布中顯示的icon -->
    <div class="iconBar" v-show="data.state === '發布中'">
      <i
        @click="turnToReadQuizView(data)"
        class="fa-regular fa-eye icon"
        title="查看問卷"
      ></i>

      <i
        @click="turnToWriteView(data)"
        class="fa-solid fa-pencil icon"
        title="填寫問卷"
      ></i>

      <i
        @click="turnToReadDataView(data)"
        class="fa-solid fa-chart-column icon"
        title="查看數據"
      ></i>
    </div>
    <!-- 發布中顯示的icon -->

    <!-- 已結束顯示的icon -->
    <div class="iconBar" v-show="data.state === '已結束'">
      <i
        @click="turnToReadQuizView(data)"
        class="fa-regular fa-eye icon"
        title="查看問卷"
      ></i>

      <i
        @click="turnToReadDataView(data)"
        class="fa-solid fa-chart-column icon"
        title="查看數據"
      ></i>

      <button @click="emitDeleteQuiz(data.id)" type="button" title="刪除問卷">
        <i class="fa-regular fa-trash-can icon"></i>
      </button>
    </div>
    <!-- 已結束顯示的icon -->
  </div>
</template>

<style scoped lang="scss">
.resList {
  width: 45vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #1e5128;
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem 0;
  box-shadow: 0px 8px 6px -6px #1e5128;

  .title {
    width: 40%;
    font-size: 1.2rem;
  }

  .state {
    width: 20%;
    font-size: 1.2rem;
  }

  .iconBar {
    width: 30%;
    display: flex;
    justify-content: space-around;
    .icon {
      font-size: 1.5rem;
      color: #1e5128;
      &:hover {
        cursor: pointer;
      }
    }

    button {
      border: none;
      background-color: white;

      &:hover {
        cursor: pointer;
      }
    }
  }

  $backgroundColor: #def5e5;
  $lightColor: #bcead5;
  $darkColor: #9ed5c5;
  $themeColor: #8ec3b0;
  $textColor: #1e5128;
}
</style>
