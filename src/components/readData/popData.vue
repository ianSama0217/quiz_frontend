<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
/* pinia */
import { useDisplayStore } from "../../stores/popStore.js";

const router = useRouter();

const displayStore = useDisplayStore();
const { closeDataPop } = displayStore;

const props = defineProps(["userinfo"]);

const turnToReadQuizAnsView = (data) => {
  router.push({
    name: "readquizAns",
    params: { id: data.quiz_id, ansId: data.ansId, name: data.name },
  });
};
</script>

<template>
  <div class="popBackground"></div>

  <div class="pop">
    <i class="fa-solid fa-xmark icon" @click="closeDataPop()"></i>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>信箱</th>
            <th>手機號碼</th>
            <th>填寫時間</th>
            <th>填寫紀錄</th>
          </tr>
        </thead>
        <tbody v-for="item in userinfo.slice().reverse()">
          <!-- 這裡放表格的內容 -->
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.date_time.replace("T", " ") }}</td>
            <td @click="turnToReadQuizAnsView(item)">
              <span class="record">填寫紀錄</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button type="button" @click="closeDataPop()">確認</button>
  </div>
</template>

<style scoped lang="scss">
.popBackground {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #1e5128;
  opacity: 0.6;
  position: fixed;
  top: 0%;
  left: 0%;
}
.pop {
  background-color: #8ec3b0;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-shadow: 5px 10px 6px -6px #1e5128;

  .icon {
    font-size: 1.5rem;
    color: #1e5128;
    position: absolute;
    top: 2%;
    right: 2%;
    transition: 0.5s ease;

    &:hover {
      cursor: pointer;
    }
  }

  p {
    font-size: 1.2rem;
    color: #1e5128;
    text-align: center;
  }

  button {
    background-color: #def5e5;
    text-decoration: none;
    font-size: 1.2rem;
    color: #1e5128;
    border: 1px solid #1e5128;
    border-radius: 8px;
    padding: 0.2rem;
    margin-top: 1rem;
    transition: 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #1e5128;
      color: #bcead5;
    }
  }
}

.table {
  max-height: 50vh;
  overflow-y: scroll;
  table {
    min-width: 55vw;
    border-collapse: collapse;

    thead {
      background-color: #bcead5;
      tr {
        font-size: 1.3rem;
        color: #1e5128;
        text-align: center;

        th {
          padding: 0.5rem;
          border: 2px solid #1e5128;
        }
      }
    }

    tbody {
      background-color: #def5e5;
      tr {
        font-size: 1.2rem;
        color: #1e5128;
        text-align: center;

        td {
          padding: 0.5rem;
          border: 1px solid #1e5128;
        }

        .record {
          font-size: 1.1rem;
          transition: 0.2s ease;

          &:hover {
            cursor: pointer;
            border-bottom: 2px solid #1e5128;
          }
        }
      }
    }
  }
}
</style>
