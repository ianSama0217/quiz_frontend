<script setup>
import { ref, reactive, onBeforeMount, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
/* api */
import api from "../api/index.js";

const router = useRouter();

const { getQuizInfo, getUserAns } = api;

//接收問卷資料 & 使用者資料
let AllData = reactive({
  quizData: {},
  ansData: {},
});

let answer = ref([]);

//判斷複選題作答內容
const isChecked = (item, index) => {
  return AllData.ansData.userinfo.ans[index].includes(item);
};

const turnToReadDataView = (data) => {
  router.push({ name: "readdata", params: { id: data.id, title: data.title } });
};

/*載入頁面前先取得指定id，顯示全部資料*/
onBeforeMount(async () => {
  const quizId = useRoute().params.id;
  const ansId = useRoute().params.ansId;

  // 取得問卷題目資料
  try {
    await getQuizInfo(quizId)
      .then((quizRes) => {
        Object.assign(AllData.quizData, reactive(toRefs(quizRes)));

        //將selection資料轉換(str -> arr)
        AllData.quizData.question.forEach((ques) => {
          ques.selection = ques.selection.split(";");
        });
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }

  // 取得問卷答案資料
  try {
    await getUserAns(ansId)
      .then((ansRes) => {
        Object.assign(AllData.ansData, reactive(toRefs(ansRes)));

        //將ans資料轉換(str -> arr)
        const strToArr = AllData.ansData.userinfo.ans.split(";");
        answer = strToArr.map((item) => {
          return item.includes("!") ? item.split("!") : item;
        });
        console.log(answer);
        //將處理完的值賦予給AllData.ansData.userinfo.ans
        AllData.ansData.userinfo.ans = answer;
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }
});
</script>

<template>
  <!-- 測試區域 -->
  <!-- <h3>問題///{{ AllData.quizData }}</h3>
  <h3>答案///{{ AllData.ansData.userinfo.ans }}</h3> -->
  <!-- <h3>{{ quizData }}</h3> -->
  <!-- <h3 v-for="item in quizData.question">{{ item.selection }}</h3> -->
  <!-- 測試區域 -->

  <div class="body">
    <div class="questionTitle">
      <span class="title">{{ AllData.quizData.quiz.title }}</span>
    </div>

    <div class="userInfo">
      <label for="">姓名</label>
      <input
        type="text"
        :value="AllData.ansData.userinfo.name"
        disabled="false"
      />
      <label for="">Email</label>
      <input
        type="text"
        :value="AllData.ansData.userinfo.email"
        disabled="false"
      />
      <label for="">手機號碼</label>
      <input
        type="text"
        :value="AllData.ansData.userinfo.phone_number"
        disabled="false"
      />
    </div>

    <div class="questionArea">
      <!-- 單個問題區塊  -->
      <div
        class="questionBox"
        v-for="(item, index) in AllData.quizData.question"
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
              v-if="AllData.quizData.question[index].selection_type == 'radio'"
            >
              <div
                class="singleRadio"
                v-for="(item, seleindex) in AllData.quizData.question[index]
                  .selection"
                :key="seleindex"
              >
                <input
                  type="radio"
                  :value="item"
                  :checked="isChecked(item, index)"
                  disabled="false"
                />
                <span class="sele">{{
                  AllData.quizData.question[index].selection[seleindex]
                }}</span>
              </div>
            </div>
            <!-- 單選區域   -->

            <!-- 複選區域   -->
            <div
              class="checkbox"
              v-if="
                AllData.quizData.question[index].selection_type == 'checkbox'
              "
            >
              <div
                class="singleCheckbox"
                v-for="(item, seleindex) in AllData.quizData.question[index]
                  .selection"
                :key="seleindex"
              >
                <input
                  type="checkbox"
                  :value="item"
                  :checked="isChecked(item, index)"
                  disabled="false"
                />
                <span class="sele">{{
                  AllData.quizData.question[index].selection[seleindex]
                }}</span>
              </div>
            </div>
            <!-- 複選區域   -->

            <!-- 文字方塊   -->
            <div
              class="textarea"
              v-if="
                AllData.quizData.question[index].selection_type == 'textarea'
              "
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
    <div class="apiBtn">
      <button type="button" @click="turnToReadDataView(AllData.quizData.quiz)">
        確認
      </button>
    </div>
  </div>
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
