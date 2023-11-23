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
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

//取得問卷細項資訊
const getQuizInfo = (id) => {
  return axios
    .get(`http://localhost:8080/quiz/get?id=${id}`)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

/*post*/

export default { getQuizFrontend, getQuizBackend, getQuizInfo };
