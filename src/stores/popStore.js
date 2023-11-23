import { ref } from "vue";
import { defineStore } from "pinia";

export const useDisplayStore = defineStore("display", () => {
  //刪除表單彈跳視窗
  const isPopDelete = ref(false);

  const isDisplayDelete = () => {
    isPopDelete.value = !isPopDelete.value;
  };

  return {
    isPopDelete,
    isDisplayDelete,
  };
});
