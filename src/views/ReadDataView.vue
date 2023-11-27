<script setup>
import { ref, onBeforeMount, toRefs, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
/* api */
import api from "../api/index.js";
/* 匯入組件 */
import popData from "../components/readData/popData.vue";
/* pinia */
import { useDisplayStore } from "../stores/popStore.js";

const router = useRouter();

const displayStore = useDisplayStore();
const { openDataPop } = displayStore;
const { isPopData } = storeToRefs(displayStore);

const { getQuizInfo, getQuizAns } = api;

//接收問卷資料 & 使用者資料
let AllData = reactive({
  quizData: {},
  ansData: {},
});

const turnToSearchView = () => {
  router.push("/search_backend");
};

/*載入頁面前先取得指定id，顯示全部資料*/
onBeforeMount(() => {
  const quizId = useRoute().params.id;
  console.log("查看數據問卷id: " + quizId);

  // 取得問卷題目資料
  getQuizInfo(quizId)
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

  // 取得問卷答案資料
  getQuizAns(quizId)
    .then((ansRes) => {
      Object.assign(AllData.ansData, reactive(toRefs(ansRes)));

      console.log();
      //將ans資料轉換(str -> arr)
      AllData.ansData.userinfos.map((item) => {
        //先處理外維陣列
        item.ans = item.ans.split(";");
        console.log(item.ans);

        //處理二維陣列(複選題)
        item.ans = item.ans.map((ans) =>
          ans.includes("!") ? ans.split("!") : ans
        );
        console.log(item.ans);
      });
    })
    .catch((e) => {
      throw e;
    });
});
</script>

<template>
  <h1>資料</h1>
  <!-- 測試區域 -->
  <!-- {{ AllData }} -->
  <div class="test" v-for="item in AllData.quizData.question">
    <p>{{ item }}</p>
    <!-- <p>///問卷資料:///{{ item.selection }}</p> -->
  </div>

  <div class="test" v-for="item in AllData.ansData.userinfos">
    <p>{{ item }}</p>
    <!-- <p>///答案資料:///{{ item.ans }}</p> -->
  </div>
  <!-- 測試區域 -->
  <div class="body">
    <div class="questionTitle">
      <span class="title">{{ AllData.quizData.quiz.title }}</span>
    </div>

    <div class="userinfo">
      <span
        ><i class="fa-solid fa-user icon"></i>填寫人數:{{
          AllData.ansData.userinfos.length
        }}</span
      >
      <button @click="openDataPop()" type="button">詳細資料</button>
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
                <input type="radio" disabled="false" />
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
                <input type="checkbox" disabled="false" />
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
      <button type="button" @click="">下載PDF</button>
      <button type="button" @click="turnToSearchView()">確認</button>
    </div>
  </div>

  <div class="popData" v-if="isPopData">
    <popData :userinfo="AllData.ansData.userinfos" />
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

  .userinfo {
    width: 25vw;
    color: #1e5128;
    padding: 0.5rem 1rem 1rem 1rem;
    margin: 0.8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 1.2rem;
      margin-bottom: 0.2rem;
    }

    .icon {
      font-size: 1.5rem;
      color: #1e5128;
      margin-right: 0.5rem;

      &:hover {
        cursor: pointer;
      }
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
