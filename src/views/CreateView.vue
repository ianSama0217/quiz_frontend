<script setup>
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
/* api */
import api from "../api/index.js";
/* 匯入組件 */
import popSave from "../components/create/popSave.vue";
/* pinia */
import { useDisplayStore } from "../stores/popStore.js";

const displayStore = useDisplayStore();
const { openSavePop } = displayStore;
const { isPopSave } = storeToRefs(displayStore);

const { createQuiz } = api;

/* 儲存用JSON格式 */
const CreateReq = reactive({
  quiz: {
    title: "",
    description: "",
    state: "",
    start_time: null,
    end_time: null,
  },
  question: [
    {
      q_name: "",
      selection_type: "radio",
      selection: ["", ""],
    },
  ],
});

/* 如果selectionType == textarea -> 清空selections */
const clearSelections = (index) => {
  if (CreateReq.question[index].selection_type == "textarea") {
    CreateReq.question[index].selection = [""];
  }
};

/* 將selections轉為字串 (用;隔開每個字串) */
//點下(post或save)發布按鈕使用
const selectionsToString = (index) => {
  //除去選項內容沒有輸入的項目
  const filteredSelections = CreateReq.question[index].selection.filter(
    (item) => item != ""
  );
  CreateReq.question[index].selection = filteredSelections.join(";");
};

/* 問題+1 */
const addQuestions = () => {
  CreateReq.question.push({
    q_name: "",
    selection_type: "radio",
    selection: ["", ""],
  });
};

/* 刪除指定問題 */
const deleteQuestions = (index) => {
  CreateReq.question.splice(index, 1);
};

/* 選項+1 */
const addSelections = (index) => {
  CreateReq.question[index].selection.push("");
};

/* 刪除指定選項 */
const deleteSelections = (index, seleindex) => {
  CreateReq.question[index].selection.splice(seleindex, 1);
};

/* 點擊儲存按鈕 */
const saveQuiz = () => {
  // 打開彈跳視窗
  openSavePop();

  // 將選項內容從arr轉換str
  let seleStr = "";
  CreateReq.question.forEach((item, index) => {
    seleStr = selectionsToString(index);
    //將req中的selection轉換為字串
    CreateReq.question[index].selection = seleStr;
  });

  //state設為: 尚未開始
  CreateReq.quiz.state = "尚未開始";

  //create API(存入CreateReq)
  createQuiz(CreateReq);
};
</script>

<template>
  <!-- 測試資料 -->
  <h4>
    {{ CreateReq }}
  </h4>
  <!-- 測試資料 -->

  <label for="">標題</label>
  <input
    v-model.trim="CreateReq.quiz.title"
    type="text"
    placeholder="輸入問卷名稱"
  />
  <label for="">問卷說明</label>
  <input
    v-model.trim="CreateReq.quiz.description"
    type="text"
    placeholder="輸入問卷名稱"
  />

  <div class="questionArea">
    <!-- 單個問題區塊  -->
    <div
      class="questionBox"
      v-for="(item, index) in CreateReq.question"
      :key="index"
    >
      <!-- 設定問題內容   -->
      <div class="setQuestion">
        <button type="button" @click="deleteQuestions">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <label for="">問題名稱</label>
        <input
          v-model.trim="CreateReq.question[index].q_name"
          type="text"
          placeholder="輸入問題名稱"
        />
        <label for="">問題類型</label>
        <select
          v-model="CreateReq.question[index].selection_type"
          @change="clearSelections(index)"
        >
          <option value="radio">單選</option>
          <option value="checkbox">複選</option>
          <option value="textarea">文字方塊</option>
        </select>
        <!-- 設定選項內容  -->
        <div class="setSelection">
          <!-- 單選區域   -->
          <div
            class="radio"
            v-if="CreateReq.question[index].selection_type == 'radio'"
          >
            <div
              v-for="(item, seleindex) in CreateReq.question[index].selection"
              :key="seleindex"
            >
              <input type="radio" disabled="false" />
              <input
                v-model.trim="CreateReq.question[index].selection[seleindex]"
                type="text"
                placeholder="輸入選項內容"
              />
              <button type="button" @click="deleteSelections(index, seleindex)">
                刪除這個radio
              </button>
            </div>
            <button type="button" @click="addSelections(index)">單選+1</button>
          </div>
          <!-- 單選區域   -->

          <!-- 複選區域   -->
          <div
            class="checkbox"
            v-if="CreateReq.question[index].selection_type == 'checkbox'"
          >
            <div
              v-for="(item, seleindex) in CreateReq.question[index].selection"
              :key="seleindex"
            >
              <input type="checkbox" disabled="false" />
              <input
                v-model.trim="CreateReq.question[index].selection[seleindex]"
                type="text"
                placeholder="輸入選項內容"
              />
              <button type="button" @click="deleteSelections(index, seleindex)">
                刪除這個checkbox
              </button>
            </div>
            <button type="button" @click="addSelections(index)">複選+1</button>
          </div>
          <!-- 複選區域   -->

          <!-- 文字方塊   -->
          <div
            class="textarea"
            v-if="CreateReq.question[index].selection_type == 'textarea'"
          >
            <textarea disabled="false"></textarea>
          </div>
          <!-- 文字方塊   -->
        </div>
        <!-- 設定選項內容  -->
      </div>
      <!-- 設定問題內容   -->
    </div>
  </div>

  <button type="button" @click="addQuestions">問題+1</button>
  <button type="button" @click="saveQuiz(index)">儲存</button>
  <button type="button">立即發布</button>

  <!-- 儲存彈跳視窗  -->
  <div class="popSave" v-if="isPopSave">
    <popSave />
  </div>
  <!-- 儲存彈跳視窗  -->
</template>

<style scoped lang="scss">
.questionBox {
  border: 1px solid red;
}
</style>
