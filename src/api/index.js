import axios from "axios";

/*get*/
//搜尋問卷(前台)
const getQuizFrontend = (title) => {
  return axios
    .get(`http://localhost:8080/quiz/search?title=${title}&state=發布中`)
    .then((res) => {
      console.log(res.data);
      const data = res.data.quizs;
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

//搜尋問卷(後台)
const getQuizBackend = (title, state) => {
  return axios
    .get(`http://localhost:8080/quiz/search?title=${title}&state=${state}`)
    .then((res) => {
      console.log(res);
      const data = res.data.quizs;
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

//取得問卷細項資訊
const getQuizInfo = (id) => {
  return axios
    .get(`http://localhost:8080/quiz/get?id=${id}`)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

/*post*/
//刪除問卷(包含對應quizId的問題及選項)
const deleteQuiz = (id) => {
  return axios
    .post(`http://localhost:8080/quiz/delete?id=${id}`)
    .then((res) => {
      console.log(res.data.rtnCode);
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

//刪除問題(包含對應qId的選項)
const deleteQestion = (qId) => {
  return axios
    .post(`http://localhost:8080/question/delete?qId=${qId}`)
    .then((res) => {
      console.log(res);
      const data = res.data.quizs;
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

//刪除選項
const deleteSelection = (seleId) => {
  return axios
    .post(`http://localhost:8080/selection/delete?seleId=${seleId}`)
    .then((res) => {
      console.log(res);
      const data = res.data.quizs;
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export default {
  getQuizFrontend,
  getQuizBackend,
  getQuizInfo,
  deleteQuiz,
  deleteQestion,
  deleteSelection,
};
