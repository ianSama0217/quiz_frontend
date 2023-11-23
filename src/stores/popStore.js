import { ref } from "vue";
import { defineStore } from "pinia";

export const useDisplayStore = defineStore("display", () => {
  //刪除表單彈跳視窗
  const isPopDelete = ref(false);

  const openDeletePop = () => {
    isPopDelete.value = true;
  };

  const closeDeletePop = () => {
    isPopDelete.value = false;
  };

  return {
    isPopDelete,
    openDeletePop,
    closeDeletePop,
  };
});
