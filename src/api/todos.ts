import { Todo } from "../types/todo";
import { jasonPlaceholderInstance } from "./axios";

export const todosApi = {
  getTodos: () =>
    jasonPlaceholderInstance
      .get<Todo[]>("/todos")
      .then((response) => response.data),

  getTodoById: (id: number) =>
    jasonPlaceholderInstance
      .get<Todo>(`/todos/${id}`)
      .then((response) => response.data),
};
