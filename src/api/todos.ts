import { jasonPlaceholderInstance } from "./axios";

export const todosApi = {
  getTodos: () =>
    jasonPlaceholderInstance.get("/todos").then((response) => response.data),

  getTodoById: (id: number) =>
    jasonPlaceholderInstance
      .get(`/todos/${id}`)
      .then((response) => response.data),
};
