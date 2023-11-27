<script setup>
import { reactive, onBeforeMount, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
/* api */
import api from "../api/index.js";
/* 匯入組件 */
import popHint from "../components/popHint.vue";
import popSentAns from "../components/create/popSentAns.vue";
/* pinia */
import { useDisplayStore } from "../stores/popStore.js";

const router = useRouter();

const displayStore = useDisplayStore();
const { openHintPop, openSentPop } = displayStore;
const { isPopHint, hintStr, isPopSent } = storeToRefs(displayStore);

const { getQuizInfo, createQuizAns } = api;

/* 儲存用JSON格式 */
const CreateAnsReq = reactive({
  userinfos: [
    {
      name: "",
      email: "",
      ans: [],
      quiz_id: 0,
      phone_number: "",
      date_time: null,
    },
  ],
});

//接收api回傳資料
const quizData = reactive({});

/* 將複選的ans用陣列[]裝起來 */
const handleCheckbox = (Qindex, seleIndex) => {
  const selectedOptions = CreateAnsReq.userinfos[0].ans[Qindex] || [];

  const optionValue = quizData.question[Qindex].selection[seleIndex];

  if (selectedOptions.includes(optionValue)) {
    // 如果選項已經在陣列中，則移除它
    selectedOptions.splice(selectedOptions.indexOf(optionValue), 1);
  } else {
    // 否則將選項添加到陣列中
    selectedOptions.push(optionValue);
  }

  // 更新指定索引的元素
  CreateAnsReq.userinfos[0].ans[Qindex] = selectedOptions;
};

/* 轉換ans資料型態 arr->str (用;隔開，內層(複選)用!隔開)*/
const ansToString = () => {
  // 判斷是否為陣列
  const ansArr = Array.isArray(CreateAnsReq.userinfos[0].ans)
    ? CreateAnsReq.userinfos[0].ans
    : [];

  const ansStr = ansArr
    // 先判對item是否為複選，再分割
    .map((item) => (Array.isArray(item) ? item.join("!") : item))
    .join(";");

  // 設定轉換後的值回 CreateAnsReq.userinfos[0].ans
  CreateAnsReq.userinfos[0].ans = ansStr;

  return ansStr;
};

/* 給定quiz_id、時間 */
const setAnsReq = () => {
  CreateAnsReq.userinfos[0].quiz_id = quizData.quiz.id;
  CreateAnsReq.userinfos[0].date_time = new Date();
};

/* 導向首頁 */
const turnToEditView = () => {
  router.push("/");
};

/* 儲存答案 */
const createAns = () => {
  setAnsReq();
  ansToString();
  createQuizAns(CreateAnsReq);
};

/* 點擊確認按鈕，超多防呆 */
const clickCreateBtn = () => {
  let data = true;

  if (data == true) {
    //沒有姓名 -> 不能發布
    if (CreateAnsReq.userinfos[0].name == "") {
      hintStr.value = "確認姓名是否輸入";
      openHintPop();
      data = false;
      return;
    }

    //未輸入標題 -> 不能發布
    if (CreateAnsReq.userinfos[0].email == "") {
      hintStr.value = "確認信箱是否輸入";
      openHintPop();
      data = false;
      return;
    }

    //未輸入說明 -> 不能發布
    if (CreateAnsReq.userinfos[0].phone_number == "") {
      hintStr.value = "確認手機號碼是否輸入";
      openHintPop();
      data = false;
      return;
    }

    // 檢查選項是否都有填寫答案
    if (CreateAnsReq.userinfos[0].ans.length > 0) {
      let allQuestionsAnswered = true; // 假設所有問題都有答案

      //判斷問題是否填寫
      CreateAnsReq.userinfos[0].ans.forEach((item, index) => {
        // 如果是陣列，則檢查每個元素是否為空
        if (Array.isArray(item)) {
          if (item.length === 0) {
            allQuestionsAnswered = false; // 有空答案，設定為 false
            hintStr.value = `確認問題 ${index + 1} 是否填寫`;
            openHintPop();
            data = false;
          } else {
            let hasSelectedOption = false; // 假設沒有選擇的選項
            item.forEach((e) => {
              if (e !== null && e !== "") {
                hasSelectedOption = true;
              }
            });
            if (!hasSelectedOption) {
              allQuestionsAnswered = false; // 沒有選擇的選項，設定為 false
              hintStr.value = `確認問題 ${index + 1} 是否填寫`;
              openHintPop();
              data = false;
            }
          }
        } else if (item === null || item === "") {
          // 如果是字串，則檢查是否為空
          allQuestionsAnswered = false; // 有空答案，設定為 false
          hintStr.value = `確認問題 ${index + 1} 是否填寫`;
          openHintPop();
          data = false;
        }
      });

      if (allQuestionsAnswered) {
        // 所有問題都有答案，繼續執行你的邏輯
        openSentPop();
        createAns();
      }
    } else {
      // 如果沒有任何答案，顯示提示
      hintStr.value = "至少需要回答一個問題";
      openHintPop();
      data = false;
    }
  }
};

/*載入頁面前先取得指定id，顯示全部資料*/
onBeforeMount(() => {
  const quizId = useRoute().params.id;
  console.log("填寫問卷id: " + quizId);

  //取得問卷資料
  getQuizInfo(quizId)
    .then((data) => {
      Object.assign(quizData, toRefs(reactive(data)));

      //將selection資料轉換(str -> arr)
      quizData.question.forEach((ques) => {
        ques.selection = ques.selection.split(";");
      });
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
});
</script>

<template>
  <!-- 測試區域 -->
  <!-- <h3>{{ quizData }}</h3> -->
  <!-- <h3 v-for="item in quizData.question">{{ item.selection }}</h3> -->
  <!-- <h3>{{ CreateAnsReq }}</h3> -->
  <!-- 測試區域 -->

  <div class="body">
    <div class="questionTitle">
      <span class="title">{{ quizData.quiz.title }}</span>
    </div>

    <div class="quizDesp">
      <span class="desp">{{ quizData.quiz.description }}</span>
    </div>

    <div class="userInfo">
      <label for="">姓名</label>
      <input
        v-model="CreateAnsReq.userinfos[0].name"
        type="text"
        placeholder="請輸入姓名"
      />
      <label for="">Email</label>
      <input
        v-model="CreateAnsReq.userinfos[0].email"
        type="email"
        placeholder="請輸入信箱"
      />
      <label for="">手機號碼</label>
      <input
        v-model="CreateAnsReq.userinfos[0].phone_number"
        type="text"
        placeholder="請輸入手機號碼"
      />
    </div>

    <div class="questionArea">
      <!-- 單個問題區塊  -->
      <div
        class="questionBox"
        v-for="(item, index) in quizData.question"
        :key="index"
      >
        <!-- 設定問題內容   -->
        <div class="setQuestion">
          <div class="setQName">
            <span class="qname">{{ item.q_name }}</span>
          </div>

          <!-- 設定選項內容  -->
          <div class="setSelection">
            <!-- 單選區域   -->
            <div
              class="radio"
              v-if="quizData.question[index].selection_type == 'radio'"
            >
              <div
                class="singleRadio"
                v-for="(item, seleindex) in quizData.question[index].selection"
                :key="seleindex"
              >
                <input
                  type="radio"
                  :name="'radio' + index + '_' + seleindex"
                  :value="quizData.question[index].selection[seleindex]"
                  v-model="CreateAnsReq.userinfos[0].ans[index]"
                />
                <span class="sele">{{
                  quizData.question[index].selection[seleindex]
                }}</span>
              </div>
            </div>
            <!-- 單選區域   -->

            <!-- 複選區域   -->
            <div
              class="checkbox"
              v-if="quizData.question[index].selection_type == 'checkbox'"
            >
              <div
                class="singleCheckbox"
                v-for="(item, seleindex) in quizData.question[index].selection"
                :key="seleindex"
              >
                <input
                  type="checkbox"
                  :name="'checkbox' + index + '_' + seleindex"
                  :value="quizData.question[index].selection[seleindex]"
                  @input="handleCheckbox(index, seleindex)"
                />
                <span class="sele">{{
                  quizData.question[index].selection[seleindex]
                }}</span>
              </div>
            </div>
            <!-- 複選區域   -->

            <!-- 文字方塊   -->
            <div
              class="textarea"
              v-if="quizData.question[index].selection_type == 'textarea'"
            >
              <textarea
                placeholder="作答區域"
                v-model="CreateAnsReq.userinfos[0].ans[index]"
              ></textarea>
            </div>
            <!-- 文字方塊   -->
          </div>
          <!-- 設定選項內容  -->
        </div>
        <!-- 設定問題內容   -->
      </div>
    </div>
    <div class="apiBtn">
      <button type="button" @click="turnToEditView()">取消</button>
      <button type="button" @click="clickCreateBtn()">確認送出</button>
    </div>
  </div>

  <!-- 提示訊息彈跳視窗  -->
  <div class="popHint" v-if="isPopHint">
    <popHint :hintStr="hintStr" />
  </div>
  <!-- 提示訊息彈跳視窗  -->

  <!-- 提交成功彈跳視窗  -->
  <div class="popSent" v-if="isPopSent">
    <popSentAns />
  </div>
  <!-- 提交成功彈跳視窗  -->

  <h3>{{ CreateAnsReq }}</h3>
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

    .title {
      font-size: 1.5rem;
      color: #1e5128;
      margin-right: 0.5rem;
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

    .desp {
      font-size: 1.2rem;
      color: #1e5128;
      margin: 0.5rem 0;
    }
  }

  .userInfo {
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
      font-size: 1.2rem;
      margin-bottom: 0.2rem;
    }

    input {
      border: none;
      outline: none;
      background-color: #8ec3b0;
      border-bottom: 1px solid #1e5128;
      height: 1.5rem;
      font-size: 1.2rem;
      padding: 0.2rem;
      margin-bottom: 0.5rem;
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
      .qname {
        font-size: 1.2rem;
      }

      .setQuestion {
        .setQues {
          display: flex;
          justify-content: space-around;
          margin-bottom: 0.5rem;
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
          }
          span {
            font-size: 1.2rem;
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
          }
          span {
            font-size: 1.2rem;
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
