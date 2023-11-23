<script setup></script>

<template>
  <div class="changeListPageBtn">
    <i class="fa-solid fa-chevron-left icon"></i>
    <span>第{{}}1頁  共{{}}3頁</span>
    <i class="fa-solid fa-chevron-right icon"></i>
  </div>
</template>

<style scoped lang="scss">
.changeListPageBtn {
  display: flex;
  justify-content: center;
  justify-content: space-around;
  width: 20vw;

  .icon {
    font-size: 1.5rem;
    color: #1e5128;
    transition: all 0.1s ease;
    border-radius: 50%;
    padding: 0.2rem;

    &:hover {
      background-color: #1e5128;
      color: #def5e5;
      cursor: pointer;
    }
  }

  span {
    font-size: 1rem;
    align-self: center;
    color: #1e5128;
  }
}
</style>
