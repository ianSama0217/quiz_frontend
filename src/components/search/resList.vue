<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(["getValue"]);

const turnToWriteView = (data) => {
  router.push({ name: "write", params: { id: data.id, title: data.title } });
};

const turnToReadQuizView = (data) => {
  router.push({ name: "readquiz", params: { id: data.id, title: data.title } });
};
</script>

<template>
  <div class="resList" v-for="(data, index) in getValue">
    <span>{{ index + 1 }}</span>
    <span class="title">{{ data.title }}</span>
    <span class="time">{{ data.start_time }} ~ {{ data.end_time }}</span>

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
    </div>
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

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
