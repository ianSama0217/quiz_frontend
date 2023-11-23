<script setup>
const props = defineProps(["id", "getValue"]);
</script>

<template>
  <div class="resList" v-for="data in getValue">
    <span class="title">{{ data.title }}</span>
    <span class="time">{{ data.start_time }} ~ {{ data.end_time }}</span>
    <button>icon</button>
  </div>
</template>

<style scoped lang="scss">
.resList {
  width: 50vw;
  border: 1px solid red;
  display: flex;
  justify-content: space-around;

  .title {
  }

  .time {
  }

  $backgroundColor: #def5e5;
  $lightColor: #bcead5;
  $darkColor: #9ed5c5;
  $themeColor: #8ec3b0;
  $textColor: #1e5128;
}
</style>
