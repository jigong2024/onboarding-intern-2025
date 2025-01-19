import axios from "axios";

export const jasonPlaceholderInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

// 메니풀 서버
// export const authInstance = axios.create({
//   baseURL: "https://moneyfulpublicpolicy.co.kr",
//   timeout: 5000,
// });

export const authInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});
