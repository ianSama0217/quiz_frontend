<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
/* api */
import api from "../api/index.js";
/* 匯入組件 */
import popSave from "../components/create/popSave.vue";
import popPost from "../components/create/popPost.vue";
import popHint from "../components/popHint.vue";
/* pinia */
import { useDisplayStore } from "../stores/popStore.js";

const router = useRouter();

const displayStore = useDisplayStore();
const { openSavePop, openHintPop, openPostPop, closePostPop } = displayStore;
const { isPopSave, isPopPost, isPopHint, hintStr } = storeToRefs(displayStore);

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

let startDate;
let endDate;

/* postPop emit資料 */
const handleStartDate = (start) => {
  startDate = start;
};

const handleEndDate = (end) => {
  endDate = end;
};

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
  return filteredSelections.join(";");
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
  //未輸入標題 -> 儲存失敗
  if (CreateReq.quiz.title == "") {
    hintStr.value = "儲存失敗<br/>至少要輸入標題";
    console.log(hintStr.value);
    openHintPop();
    return;
  }
  console.log(CreateReq.quiz.title);
  // 打開彈跳視窗
  openSavePop();

  // 將選項內容從arr轉換str
  CreateReq.question.forEach((item, index) => {
    //將req中的selection轉換為字串
    const seleStr = selectionsToString(index);
    CreateReq.question[index].selection = seleStr;
    console.log(
      "第" + (index + 1) + "題選項" + CreateReq.question[index].selection
    );
  });

  //state設為: 尚未開始
  CreateReq.quiz.state = "尚未開始";

  //create API(存入CreateReq)
  createQuiz(CreateReq);
};

/* 點擊發布按鈕，超多防呆 */
const clickPostBtn = () => {
  let data = true;

  if (data == true) {
    //未輸入標題 -> 不能發布
    if (CreateReq.quiz.title == "") {
      hintStr.value = "確認問卷標題是否輸入";
      openHintPop();
      data = false;
    }

    //未輸入說明 -> 不能發布
    if (CreateReq.quiz.description == "") {
      hintStr.value = "輸入問卷說明才能發布";
      openHintPop();
      data = false;
    }

    //沒有題目 -> 不能發布
    if (CreateReq.question.length <= 0) {
      hintStr.value = "至少要有一題才能發布";
      openHintPop();
      data = false;
    }

    //問題內有輸入q_name,selection才能發布
    CreateReq.question.forEach((item) => {
      if (item.q_name == "") {
        hintStr.value = "確認問題名稱是否輸入";
        openHintPop();
        data = false;
      }

      //selection至少要兩個選項才能發布
      if (item.selection.length < 2 && item.selection_type != "textarea") {
        hintStr.value = "單選和複選至少要有2個選項";
        openHintPop();
        data = false;
      }

      item.selection.forEach((sele) => {
        //selection至少要兩個選項(不是空字串)才能發布
        if (sele == "" && item.selection_type != "textarea") {
          hintStr.value = "確認選項內容是否輸入";
          openHintPop();
          data = false;
        }
      });
    });
    if (data) {
      openPostPop();
    }
  }
};

/* 發布問卷 */
const postQuiz = () => {
  /* 日期防呆 */
  const currentDateTime = new Date();
  let data = true;
  //先將日期轉為Date資料
  CreateReq.quiz.start_time = new Date(startDate);
  CreateReq.quiz.end_time = new Date(endDate);

  // 將日期轉換為日期字串（僅包含日期部分）
  const startDateStr = new Date(CreateReq.quiz.start_time)
    .toISOString()
    .split("T")[0];
  const currentDateTimeStr = currentDateTime.toISOString().split("T")[0];

  if (CreateReq.quiz.start_time == null || CreateReq.quiz.end_time == null) {
    alert("請輸入日期");
    data = false;
  } else if (startDateStr < currentDateTimeStr) {
    alert("發布日期不能小於今天");
    data = false;
  } else if (CreateReq.quiz.start_time > CreateReq.quiz.end_time) {
    alert("發布日期不能大於結束日期");
    data = false;
  }
  /* 用日期判斷state狀態 */

  if (CreateReq.quiz.start_time <= currentDateTime) {
    CreateReq.quiz.state = "發布中";
  }

  if (CreateReq.quiz.start_time > currentDateTime) {
    CreateReq.quiz.state = "尚未開始";
  }

  // 將選項內容從arr轉換str
  if (data) {
    CreateReq.question.forEach((item, index) => {
      //將req中的selection轉換為字串
      const seleStr = selectionsToString(index);
      CreateReq.question[index].selection = seleStr;
      console.log(
        "第" + (index + 1) + "題選項" + CreateReq.question[index].selection
      );
    });
  }

  if (data) {
    //create API(存入CreateReq)
    createQuiz(CreateReq);
    //關閉popPost
    closePostPop();
    //跳轉至HomeView
    router.push("/search_backend");
  }
};
</script>

<template>
  <!-- 測試資料 -->
  <!-- <h3>{{ CreateReq }}</h3> -->
  <!-- 測試資料 -->
  <div class="body">
    <div class="questionTitle">
      <label for="">標題</label>
      <input
        v-model.trim="CreateReq.quiz.title"
        type="text"
        placeholder="輸入問卷名稱"
      />
    </div>

    <div class="quizDesp">
      <label for="">問卷說明</label>
      <textarea
        v-model.trim="CreateReq.quiz.description"
        type="text"
        placeholder="輸入問卷說明(200字以內)"
      ></textarea>
    </div>

    <div class="questionArea">
      <!-- 單個問題區塊  -->
      <div
        class="questionBox"
        v-for="(item, index) in CreateReq.question"
        :key="index"
      >
        <!-- 設定問題內容   -->
        <div class="setQuestion">
          <i
            @click="deleteQuestions(index)"
            class="fa-solid fa-xmark xicon"
          ></i>

          <div class="setQues">
            <div class="setQName">
              <label for="">問題名稱</label>
              <input
                v-model.trim="CreateReq.question[index].q_name"
                type="text"
                placeholder="輸入問題名稱"
              />
            </div>

            <div class="setQType">
              <label for="">問題類型</label>
              <select
                v-model="CreateReq.question[index].selection_type"
                @change="clearSelections(index)"
              >
                <option value="radio">單選</option>
                <option value="checkbox">複選</option>
                <option value="textarea">文字方塊</option>
              </select>
            </div>
          </div>

          <!-- 設定選項內容  -->
          <div class="setSelection">
            <!-- 單選區域   -->
            <div
              class="radio"
              v-if="CreateReq.question[index].selection_type == 'radio'"
            >
              <div
                class="singleRadio"
                v-for="(item, seleindex) in CreateReq.question[index].selection"
                :key="seleindex"
              >
                <input type="radio" disabled="false" />
                <input
                  v-model.trim="CreateReq.question[index].selection[seleindex]"
                  type="text"
                  placeholder="輸入選項內容"
                />
                <i
                  @click="deleteSelections(index, seleindex)"
                  class="fa-regular fa-trash-can trashIcon"
                ></i>
              </div>
              <button type="button" @click="addSelections(index)">
                新增選項
              </button>
            </div>
            <!-- 單選區域   -->

            <!-- 複選區域   -->
            <div
              class="checkbox"
              v-if="CreateReq.question[index].selection_type == 'checkbox'"
            >
              <div
                class="singleCheckbox"
                v-for="(item, seleindex) in CreateReq.question[index].selection"
                :key="seleindex"
              >
                <input type="checkbox" disabled="false" />
                <input
                  v-model.trim="CreateReq.question[index].selection[seleindex]"
                  type="text"
                  placeholder="輸入選項內容"
                />
                <i
                  @click="deleteSelections(index, seleindex)"
                  class="fa-regular fa-trash-can trashIcon"
                ></i>
              </div>
              <button type="button" @click="addSelections(index)">
                新增選項
              </button>
            </div>
            <!-- 複選區域   -->

            <!-- 文字方塊   -->
            <div
              class="textarea"
              v-if="CreateReq.question[index].selection_type == 'textarea'"
            >
              <textarea disabled="false" placeholder="作答區域"></textarea>
            </div>
            <!-- 文字方塊   -->
          </div>
          <!-- 設定選項內容  -->
        </div>
        <!-- 設定問題內容   -->
      </div>
    </div>

    <button type="button" @click="addQuestions">新增問題</button>
    <div class="apiBtn">
      <button type="button" @click="saveQuiz(index)">儲存問卷</button>
      <button type="button" @click="clickPostBtn()">立即發布</button>
    </div>
  </div>

  <!-- 儲存彈跳視窗  -->
  <div class="popSave" v-if="isPopSave">
    <popSave />
  </div>
  <!-- 儲存彈跳視窗  -->

  <!-- 發布問卷彈跳視窗  -->
  <div class="popPost" v-if="isPopPost">
    <popPost
      :postQuiz="postQuiz"
      @startDate="handleStartDate"
      @endDate="handleEndDate"
    />
  </div>
  <!-- 發布問卷彈跳視窗  -->

  <!-- 提示訊息彈跳視窗  -->
  <div class="popHint" v-if="isPopHint">
    <popHint :hintStr="hintStr" />
  </div>
  <!-- 提示訊息彈跳視窗  -->
</template>

<style scoped lang="scss">
button {
  align-self: center;
  font-size: 1.2rem;
  background-color: #bcead5;
  color: #1e5128;
  border-radius: 8px;
  border: 1px solid #1e5128;
  padding: 0.2rem 0.4rem;
  transition: 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #1e5128;
    color: #bcead5;
  }
}

.body {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .questionTitle {
    margin-top: 1rem;

    label {
      font-size: 1.5rem;
      color: #1e5128;
      margin-right: 0.5rem;
    }

    input {
      border: none;
      outline: none;
      border-bottom: 1px solid #1e5128;
      height: 2rem;
      font-size: 1.3rem;
      padding: 0.2rem;
    }
  }

  .quizDesp {
    width: 50vw;
    border-radius: 12px;
    background-color: #8ec3b0;
    color: #1e5128;
    padding: 0.5rem 1rem 1rem 1rem;
    margin: 0.8rem 0;
    box-shadow: 0px 5px 6px -6px #1e5128;
    display: flex;
    flex-direction: column;

    label {
      align-self: center;
      font-size: 1.4rem;
      color: #1e5128;
      margin: 0.5rem 0;
    }

    textarea {
      max-width: 100%;
      min-width: 50%;
      min-height: 25vh;
      max-height: 30vh;
      border: none;
      outline: none;
      border-radius: 8px;
      background-color: #def5e5;
      height: 2rem;
      font-size: 1.2rem;
      padding: 0.2rem;
    }
  }

  .questionArea {
    display: flex;
    flex-direction: column;

    .questionBox {
      width: 50vw;
      border-radius: 12px;
      background-color: #8ec3b0;
      color: #1e5128;
      padding: 2rem 1rem 1rem 1rem;
      margin: 0.8rem 0;
      box-shadow: 0px 5px 6px -6px #1e5128;
      position: relative;

      .xicon {
        font-size: 1.4rem;
        position: absolute;
        top: 3%;
        right: 1%;
        transition: 0.5s ease;
        padding: 0.3rem;
        border-radius: 8px;

        &:hover {
          cursor: pointer;
          outline: 1px solid #1e5128;
        }
      }

      .setQues {
        display: flex;
        justify-content: space-around;
        margin-bottom: 0.5rem;

        .setQName {
          label {
            font-size: 1.2rem;
            margin-right: 0.5rem;
          }

          input {
            border: none;
            outline: none;
            background-color: #8ec3b0;
            border-bottom: 1px solid #1e5128;
            height: 1.5rem;
            font-size: 1.2rem;
            padding: 0.2rem;
          }
        }

        .setQType {
          label {
            font-size: 1.2rem;
            margin-right: 0.5rem;
          }

          select {
            padding: 0.2rem;
            font-size: 1rem;
          }
        }
      }

      .setSelection {
        .radio {
          display: flex;
          flex-direction: column;

          .singleRadio {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;

            input[type="radio"] {
              margin-right: 0.5rem;
              transform: scale(1.5);
            }

            input[type="text"] {
              width: 50%;
              border: none;
              outline: none;
              height: 1.5rem;
              padding: 0.2rem;
              font-size: 1.2rem;
            }
            .trashIcon {
              font-size: 1.3rem;
              color: #1e5128;
              margin-left: 0.5rem;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .checkbox {
          display: flex;
          flex-direction: column;
          .singleCheckbox {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;

            input[type="checkbox"] {
              margin-right: 0.5rem;
              transform: scale(1.5);
            }

            input[type="text"] {
              width: 50%;
              border: none;
              outline: none;
              height: 1.5rem;
              padding: 0.2rem;
              font-size: 1.2rem;
            }
            .trashIcon {
              font-size: 1.3rem;
              color: #1e5128;
              margin-left: 0.5rem;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .textarea {
          display: flex;
          justify-content: center;
          align-items: center;
          textarea {
            min-width: 30vw;
            min-height: 20vh;
            max-height: 25vh;
            font-size: 1.1rem;
            border-radius: 12px;
            background-color: #def5e5;
            color: #1e5128;
            padding: 0.5rem;
            margin: 0.5rem 0;
            box-shadow: 0px 5px 6px -6px #1e5128;
          }
        }
      }
    }
  }
  .apiBtn {
    margin: 2rem 0 1rem 0;
    button {
      margin: 0 2rem;
      transform: scale(1.2);
    }
  }
}
</style>
