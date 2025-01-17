import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { todosApi } from "../../api/axios";

const TodoTest = () => {
  const [selectedId, setSelectedId] = useState<number>(1);

  // 투두 리스트 조회
  const { data: todos, isLoading: listLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getTodos,
  });

  // 특정 투두 리스트 조회
  const { data: todo, isLoading: detailLoading } = useQuery({
    queryKey: ["todo", selectedId],
    queryFn: () => todosApi.getTodoById(selectedId),
    enabled: !!selectedId,
  });

  if (listLoading) return <div>Loading todos...</div>;

  return (
    <div>
      <div>
        <h1>Todos List</h1>
        <div>
          {todos?.slice(0, 5).map((todo) => (
            <div key={todo.id} onClick={() => setSelectedId(todo.id)}>
              {todo.title}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Selected Todo</h2>
        {detailLoading ? (
          <div>Loading detail...</div>
        ) : (
          <div>
            <h3>{todo?.title}</h3>
            <p>Completed: {todo?.completed ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoTest;
