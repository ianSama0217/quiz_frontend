<script setup>
import { ref, reactive } from "vue";

/* 儲存用JSON格式 */
// const req = reactive({
//   quiz: {
//     title: title,
//     description: desp,
//   },
// });
/* 創建儲存資料 */
const title = ref("");
const desp = ref("");
const qName = ref("");
const seleType = ref("radio");
const selections = ref(["", ""]);

/* 將selections轉為字串 (用;隔開每個字串) */
const selectionStr = "";
const selectionsToString = () => {
  selections.forEach((element) => {
    selectionStr += element + ";";
  });
};

/* 選項+1 */
const addSelections = () => {
  selections.value.push("");
};

/* 刪除指定選項 */
const deleteSelections = (index) => {
  selections.value.splice(index, 1);
};
</script>

<template>
  <p>
    標題:{{ title }}///說明:{{ desp }}///題目類型:{{ seleType }}///題目名稱:{{
      qName
    }}///選項內容:{{ selections }}
  </p>
  <label for="">標題</label>
  <input v-model.trim="title" type="text" placeholder="輸入問卷名稱" />
  <label for="">問卷說明</label>
  <input v-model.trim="desp" type="text" placeholder="輸入問卷名稱" />

  <div class="questionArea">
    <!-- 單個問題區塊  -->
    <div class="questionBox">
      <!-- 設定問題內容   -->
      <div class="setQuestion">
        <label for="">問題名稱</label>
        <input v-model.trim="qName" type="text" placeholder="輸入問題名稱" />
        <label for="">問題類型</label>
        <select v-model="seleType">
          <option value="radio">單選</option>
          <option value="checkbox">複選</option>
          <option value="textarea">文字方塊</option>
        </select>
        <!-- 設定選項內容  -->
        <div class="setSelection">
          <!-- 單選區域   -->
          <div v-for="(item, index) in selections" :key="index">
            <input type="radio" />
            <input
              v-model.trim="selections[index]"
              type="text"
              placeholder="輸入選項內容"
            />
            <button type="button" @click="deleteSelections(index)">
              刪除這個radio
            </button>
          </div>
          <button type="button" @click="addSelections()">單選+1</button>
          <!-- 單選區域   -->

          <!-- 複選區域   -->
          <input type="checkbox" />
          <input type="text" placeholder="輸入選項內容" />
          <!-- 複選區域   -->

          <!-- 文字方塊   -->
          <textarea></textarea>
          <!-- 文字方塊   -->
        </div>
        <!-- 設定選項內容  -->
      </div>
      <!-- 設定問題內容   -->
    </div>
  </div>

  <button type="button">儲存</button>
  <button type="button">立即發布</button>
</template>

<style scoped lang="scss">
.questionBox {
  border: 1px solid red;
}
</style>
