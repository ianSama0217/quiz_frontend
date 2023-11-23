<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["getValue"]);
const emits = defineEmits(["deleteQuizItem"]);

const emitDeleteQuiz = (id) => {
  emits("deleteQuizItem", id);
};
</script>

<template>
  <div class="resList" v-for="data in getValue">
    <span class="title">{{ data.title }}</span>
    <span class="time">{{ data.state }}</span>

    <!-- 尚未開始顯示的icon -->
    <div class="iconBar" v-show="data.state === '尚未開始'">
      <RouterLink to="/" title="編輯問卷">
        <i class="fa-regular fa-pen-to-square icon"></i>
      </RouterLink>

      <button @click="emitDeleteQuiz(data.id)" type="button" title="刪除問卷">
        <i class="fa-regular fa-trash-can icon"></i>
      </button>
    </div>
    <!-- 尚未開始顯示的icon -->

    <!-- 發布中顯示的icon -->
    <div class="iconBar" v-show="data.state === '發布中'">
      <RouterLink to="/" title="查看問卷">
        <i class="fa-regular fa-eye icon"></i>
      </RouterLink>

      <RouterLink to="/" title="填寫問卷">
        <i class="fa-solid fa-pencil icon"></i>
      </RouterLink>
    </div>
    <!-- 發布中顯示的icon -->

    <!-- 已結束顯示的icon -->
    <div class="iconBar" v-show="data.state === '已結束'">
      <RouterLink to="/" title="查看問卷">
        <i class="fa-regular fa-eye icon"></i>
      </RouterLink>

      <RouterLink to="/" title="查看數據">
        <i class="fa-solid fa-chart-column icon"></i>
      </RouterLink>

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
    width: 30%;
    font-size: 1.2rem;
  }

  .time {
    width: 40%;
    font-size: 1.2rem;
  }

  .iconBar {
    width: 20%;
    display: flex;
    justify-content: space-around;
    .icon {
      font-size: 1.5rem;
      color: #1e5128;
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
