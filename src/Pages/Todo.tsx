import Filters from "@/components/Filters/Filters";
import TodoList from "@/components/TodoList/TodoList";
import { Card, Divider, Typography, theme } from "antd";
import { memo } from "react";

const { Title, Paragraph } = Typography;
const Todo = memo(() => {
  const {
    token: { colorBgLayout, colorBgContainer, paddingContentHorizontal },
  } = theme.useToken();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colorBgLayout,
        padding: paddingContentHorizontal,
      }}>
      <Card
        style={{
          width: 500,
          maxWidth: "100%",
          flex: 1,
          margin: "auto",
          backgroundColor: colorBgContainer,
          display: "flex",
          flexDirection: "column",
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}>
        <Title level={1} style={{ textAlign: "center" }}>
          TODO APP with REDUX
        </Title>
        <Paragraph style={{ textAlign: "center" }}>Everything is stored in your local data(●'◡'●)</Paragraph>
        <Filters />
        <Divider />
        <TodoList />
      </Card>
    </div>
  );
});

export default Todo;
// tsrafce
