import { ref } from "vue";
import { defineStore } from "pinia";

export const useDisplayStore = defineStore("display", () => {
  /* 刪除表單彈跳視窗 */
  const isPopDelete = ref(false);

  const openDeletePop = () => {
    isPopDelete.value = true;
  };

  const closeDeletePop = () => {
    isPopDelete.value = false;
  };

  /* 儲存表單彈跳視窗 */
  const isPopSave = ref(false);

  const openSavePop = () => {
    isPopSave.value = true;
  };

  const closeSavePop = () => {
    isPopSave.value = false;
  };

  return {
    isPopDelete,
    openDeletePop,
    closeDeletePop,
    isPopSave,
    openSavePop,
    closeSavePop,
  };
});
