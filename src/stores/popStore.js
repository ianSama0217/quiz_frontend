import { ref } from "vue";
import { defineStore } from "pinia";

export const useDisplayStore = defineStore("display", () => {
  /* 防呆訊息彈跳視窗 */
  const isPopHint = ref(false);

  const openHintPop = () => {
    isPopHint.value = true;
  };

  const closeHintPop = () => {
    isPopHint.value = false;
  };

  const hintStr = ref("");

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

  /* 儲存表單彈跳視窗 */
  const isPopPost = ref(false);

  const openPostPop = () => {
    isPopPost.value = true;
  };

  const closePostPop = () => {
    isPopPost.value = false;
  };

  /* 提交答案彈跳視窗 */
  const isPopSent = ref(false);

  const openSentPop = () => {
    isPopSent.value = true;
  };

  const closeSentPop = () => {
    isPopSent.value = false;
  };

  /* 查看data填寫人員彈跳視窗 */
  const isPopData = ref(false);

  const openDataPop = () => {
    isPopData.value = true;
  };

  const closeDataPop = () => {
    isPopData.value = false;
  };

  return {
    isPopHint,
    openHintPop,
    closeHintPop,
    hintStr,
    isPopDelete,
    openDeletePop,
    closeDeletePop,
    isPopSave,
    openSavePop,
    closeSavePop,
    isPopPost,
    openPostPop,
    closePostPop,
    isPopSent,
    openSentPop,
    closeSentPop,
    isPopData,
    openDataPop,
    closeDataPop,
  };
});
