<script setup>
import { ref, onBeforeMount, toRefs, reactive, toRef } from "vue";
import { useRoute } from "vue-router";
/* api */
import api from "../api/index.js";

const { getQuizInfo, getQuizAns } = api;
//接收問卷資料 & 使用者資料
let AllData = reactive({
  quizData: {},
  ansData: {},
});

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
    <p>///問卷資料:///{{ item.selection }}</p>
  </div>

  <div class="test" v-for="item in AllData.ansData.userinfos">
    <p>///答案資料:///{{ item.ans }}</p>
  </div>
  <!-- 測試區域 -->
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
