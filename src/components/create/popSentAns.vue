<script setup>
import { useRouter } from "vue-router";
/* pinia */
import { useDisplayStore } from "../../stores/popStore.js";

const router = useRouter();

const displayStore = useDisplayStore();
const { closeSentPop } = displayStore;

const turnTosearch = () => {
  closeSentPop();
  router.push("/search_backend");
};
</script>

<template>
  <div class="popBackground"></div>

  <div class="pop">
    <p>儲存成功</p>
    <p>請至歷史紀錄查看</p>

    <button type="button" @click="turnTosearch">確認</button>
  </div>
</template>

<style scoped lang="scss">
.popBackground {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #1e5128;
  opacity: 0.6;
  position: fixed;
  top: 0%;
  left: 0%;
}
.pop {
  background-color: #8ec3b0;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-shadow: 5px 10px 6px -6px #1e5128;

  p {
    font-size: 1.2rem;
    color: #1e5128;
    text-align: center;
  }

  button {
    background-color: #def5e5;
    text-decoration: none;
    font-size: 1.2rem;
    color: #1e5128;
    border: 1px solid #1e5128;
    border-radius: 8px;
    padding: 0.2rem;
    margin-top: 1rem;
    transition: 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #1e5128;
      color: #bcead5;
    }
  }
}
</style>
