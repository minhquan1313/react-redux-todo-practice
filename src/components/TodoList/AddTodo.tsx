import { addTodo } from "@/redux/Slice/todoListSlice";
import { TPriority } from "@/type/TPriority";
import { Button, Input, Select, Space, Tag } from "antd";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

const AddTodo = memo(() => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [priority, setPriority] = useState<TPriority>("Medium");

  const handleAddNewTodo = () => {
    dispatch(
      addTodo({
        id: v4(),
        completed: false,
        name,
        priority,
      })
    );

    setName("");
    setPriority("Medium");
  };

  return (
    <Space.Compact style={{ display: "flex" }}>
      <Input value={name} onChange={(e) => setName(e.target.value)} onPressEnter={handleAddNewTodo} />

      <Select onChange={setPriority} value={priority}>
        <Select.Option value="High" label="High">
          <Tag color="red">High</Tag>
        </Select.Option>

        <Select.Option value="Medium" label="Medium">
          <Tag color="blue">Medium</Tag>
        </Select.Option>

        <Select.Option value="Low" label="Low">
          <Tag color="gray">Low</Tag>
        </Select.Option>
      </Select>

      <Button onClick={handleAddNewTodo} type="primary">
        Add
      </Button>
    </Space.Compact>
  );
});

export default AddTodo;
