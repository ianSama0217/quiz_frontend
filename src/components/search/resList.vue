<script setup>
const props = defineProps(["getValue"]);
</script>

<template>
  <div class="resList" v-for="data in getValue">
    <span class="title">{{ data.title }}</span>
    <span class="time">{{ data.start_time }} ~ {{ data.end_time }}</span>

    <div class="iconBar">
      <RouterLink to="/" title="查看問卷">
        <i class="fa-regular fa-eye icon"></i>
      </RouterLink>

      <RouterLink to="/" title="填寫問卷">
        <i class="fa-solid fa-pencil icon"></i>
      </RouterLink>
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
    }
  }
}
</style>
