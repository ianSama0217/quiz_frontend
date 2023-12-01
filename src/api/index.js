import axios from "axios";

/*get*/
//搜尋問卷(前台)
const getQuizFrontend = (title) => {
  return axios
    .get(`http://localhost:8080/quiz/search?title=${title}&state=發布中`)
    .then((res) => {
      const data = res.data.quizs;
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

//搜尋問卷(後台)
const getQuizBackend = (title, state) => {
  return axios
    .get(`http://localhost:8080/quiz/search?title=${title}&state=${state}`)
    .then((res) => {
      const data = res.data.quizs;
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

//取得問卷細項資訊
const getQuizInfo = (id) => {
  return axios
    .get(`http://localhost:8080/quiz/get?id=${id}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

//取得問卷作答資訊(依ansid取得單筆)
const getUserAns = (id) => {
  return axios
    .get(`http://localhost:8080/quiz/get/user?id=${id}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

//取得問卷作答資訊(所有作答資訊)
const getQuizAns = (id) => {
  return axios
    .get(`http://localhost:8080/quiz/get/answer?id=${id}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      return data;
    })
    .catch((e) => {
      throw e;
    });
};

/*post*/
//新增問卷
const createQuiz = (req) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/quiz/create`,
    data: req,
  })
    .then((res) => {
      console.log("新增問卷訊息" + res.data.rtnCode);
    })
    .catch((e) => {
      throw e;
    });
};

//作答結束新增userinfo
const createQuizAns = (req) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/quiz/create/answer`,
    data: req,
  })
    .then((res) => {
      console.log("新增答案訊息" + res.data.rtnCode);
    })
    .catch((e) => {
      throw e;
    });
};

//刪除問卷(包含對應quizId的問題及選項)
const deleteQuiz = (id) => {
  return axios
    .post(`http://localhost:8080/quiz/delete?id=${id}`)
    .then((res) => {
      console.log("刪除問卷訊息" + res.data.rtnCode);
    })
    .catch((e) => {
      throw e;
    });
};

export default {
  getQuizFrontend,
  getQuizBackend,
  getQuizInfo,
  getUserAns,
  getQuizAns,
  createQuiz,
  createQuizAns,
  deleteQuiz,
};
