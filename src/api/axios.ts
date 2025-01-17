import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export const todosApi = {
  getTodos: () => axiosInstance.get("/todos").then((response) => response.data),

  getTodoById: (id: number) =>
    axiosInstance.get(`/todos/${id}`).then((response) => response.data),
};
