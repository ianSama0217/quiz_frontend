<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

/*載入頁面前先取得指定id，顯示全部資料*/
onBeforeMount(() => {
  const quizId = useRoute().params.id;
  console.log("查看數據問卷id: " + quizId);
});
</script>

<template>
  <h1>查看問卷數據頁面</h1>
</template>
