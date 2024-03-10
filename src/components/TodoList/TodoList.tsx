import Todo from "@/components/Todo/Todo";
import AddTodo from "@/components/TodoList/AddTodo";
import { todoListRemainSelector } from "@/redux/selectors";
import { theme } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";

const TodoList = memo(() => {
  const {
    token: { paddingContentHorizontal },
  } = theme.useToken();

  const todoList = useSelector(todoListRemainSelector);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: paddingContentHorizontal }}>
        {/* <Todo name="Learn React" priority="High" />
          <Todo name="Learn Redux" priority="Medium" />
          <Todo name="Learn JavaScript" priority="Low" /> */}
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>

      <div>
        <AddTodo />
      </div>
    </div>
  );
});
export default TodoList;
