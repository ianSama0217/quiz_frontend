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
/* 匯入chartjs */
import Chart from "chart.js/auto";

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

//設定chartJs類型
const chartTypes = ref([]);

const turnToSearchView = () => {
  router.push("/search_backend");
};

/*載入頁面前先取得指定id，顯示全部資料*/
onBeforeMount(async () => {
  const quizId = useRoute().params.id;
  console.log("查看數據問卷id: " + quizId);

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
    await getQuizAns(quizId)
      .then((ansRes) => {
        Object.assign(AllData.ansData, reactive(toRefs(ansRes)));

        console.log();
        //將ans資料轉換(str -> arr)
        AllData.ansData.userinfos.map((item) => {
          //先處理外維陣列
          item.ans = item.ans.split(";");
          // console.log(item.ans);

          //處理二維陣列(複選題)
          item.ans = item.ans.map((ans) =>
            ans.includes("!") ? ans.split("!") : ans
          );
          // console.log(item.ans);
        });
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }

  //儲存使用者做答紀錄
  let ansCounts = {}; //keys = labels/ values = data
  //儲存dataChart陣列
  let chartConfigs = []; //儲存圖表

  // 在這裡設置 chartTypes 的初始值(長條圖)
  chartTypes.value = AllData.quizData.question.map(() => "bar");

  /* 依照問題類型製作統計圖表(單、複選 || 文字方塊) */
  AllData.quizData.question.forEach((ques, index) => {
    //初始化
    ansCounts[index] = {};
    //區隔選擇和文字方塊
    if (ques.selection_type == "radio" || ques.selection_type == "checkbox") {
      ansCounts[index].keys = ques.selection.map((sele) => sele);
    } else {
      AllData.ansData.userinfos.forEach((userAns) => {
        //如果已經有key就停止迴圈
        if (!ansCounts[index].keys) {
          ansCounts[index].keys = [];
          AllData.ansData.userinfos.forEach((userAns) => {
            ansCounts[index].keys.push(...userAns.ans);
          });
        }
      });
    }

    // 初始化 values
    ansCounts[index].values = {};

    // 統計做答次數
    if (AllData.ansData.userinfos) {
      AllData.ansData.userinfos.forEach((userAns) => {
        userAns.ans.forEach((ans) => {
          if (Array.isArray(ans)) {
            // 處理陣列的情況（複選題）
            ans.forEach((option) => {
              if (ansCounts[index].keys.includes(option)) {
                ansCounts[index].values[option] =
                  (ansCounts[index].values[option] || 0) + 1;
              }
            });
          } else {
            // 單選或文字方塊的情況
            if (ansCounts[index].keys.includes(ans)) {
              ansCounts[index].values[ans] =
                (ansCounts[index].values[ans] || 0) + 1;
            }
          }
        });
      });
    }

    /* 利用ansCounts資料畫出圖表 */
    const ctx = document.getElementById("myChart" + index);
    const ctx2 = document.getElementById("myChart2" + index);

    if (ques.selection_type === "radio" || ques.selection_type === "checkbox") {
      //長條圖
      const chartConfigBar = {
        type: "bar",
        data: {
          labels: ansCounts[index].keys,
          datasets: [
            {
              label: "填寫人數",
              data: ansCounts[index].values, // 每個選項對應的回答次數
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
      };
      //圓餅圖
      const chartConfigPie = {
        type: "pie",
        data: {
          labels: ansCounts[index].keys,
          datasets: [
            {
              label: "這是標題",
              data: Object.values(ansCounts[index].values),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
      };

      // 創建data圖表
      const chart = new Chart(ctx, chartConfigBar);
      //將製作好的圖表加入陣列
      chartConfigs.push({ chart, type: "bar", config: chartConfigBar });
      const chart2 = new Chart(ctx2, chartConfigPie);
      //將製作好的圖表加入陣列
      chartConfigs.push({ chart2, type: "pie", config: chartConfigPie });
    }
    /* ^^^ 利用ansCounts資料畫出圖表 ^^^ */
  });
});
</script>

<template>
  <!-- 測試區域 -->
  <!-- {{ AllData }} -->
  <!-- <div class="test" v-for="item in AllData.quizData.question">
    <p>{{ item }}</p>
  </div> -->
  <!-- <div class="test" v-for="item in AllData.ansData.userinfos">
    <p>{{ item }}</p>
  </div> -->
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

    <div
      class="questionArea"
      v-for="(item, index) in AllData.quizData.question"
      :key="index"
    >
      <div class="line"></div>
      <!-- 單個問題區塊  -->
      <div class="questionBox">
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

      <!-- 數據圖表 -->
      <div class="dataChart">
        <div
          class="chooseType"
          v-show="AllData.quizData.question[index].selection_type != 'textarea'"
        >
          <input
            type="radio"
            :name="'chartType' + index"
            v-model="chartTypes[index]"
            value="bar"
          />
          <label for="">長條圖</label>
          <input
            type="radio"
            :name="'chartType' + index"
            v-model="chartTypes[index]"
            value="pie"
          />
          <label for="">圓餅圖</label>
        </div>
        <div class="barChart" v-show="chartTypes[index] == 'bar'">
          <canvas :id="'myChart' + index"></canvas>
        </div>
        <div class="pieChart" v-show="chartTypes[index] == 'pie'">
          <canvas :id="'myChart2' + index"></canvas>
        </div>
      </div>
      <!-- 數據圖表 -->
    </div>

    <div class="apiBtn">
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

  .line {
    border-bottom: 2px solid #1e5128;
    width: 50vw;
  }

  .questionArea {
    display: flex;
    flex-direction: column;
    align-items: center;

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

    .dataChart {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50vw;
      min-height: 40vh;
      margin-bottom: 1rem;

      .chooseType {
        width: 20vw;
        display: flex;
        justify-content: space-around;

        input {
          margin-right: 0.5rem;
          transform: scale(1.5);
        }

        label {
          font-size: 1.2rem;
          color: #1e5128;
        }
      }

      .barChart {
        width: 50vw;
      }

      .pieChart {
        width: 30vw;
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
