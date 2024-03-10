import { prioritiesFilterChange, searchFilterChange, statusFilterChange } from "@/redux/Slice/filtersSlice";
import { store } from "@/redux/store";
import { TPriority } from "@/type/TPriority";
import { TStateFilterStatus } from "@/type/TReducer";
import { Col, Input, Radio, Row, Select, SelectProps, Tag, Typography } from "antd";
import { SearchProps } from "antd/es/input";
import { RadioGroupProps } from "antd/lib";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const { Search } = Input;

const { filters } = store.getState();

export default function Filters() {
  const [_, setQuery] = useSearchParams();

  const [search, setSearch] = useState<string | undefined>(filters.search || undefined);
  const [status, setStatus] = useState<TStateFilterStatus>(filters.status);
  const [priority, setPriority] = useState<TPriority[]>(filters.priority as TPriority[]);
  const dispatch = useDispatch();

  const updateQuery = () => {
    const obj = {
      search,
      status,
      priority,
    };
    const qs = QueryString.stringify(obj, {
      arrayFormat: "comma",
    });
    // console.log({ obj, qs });

    setQuery(qs);
  };

  const handleSearchChange: SearchProps["onChange"] = (e) => {
    const value = e.target.value.trim();
    setSearch(value || undefined);
    dispatch(searchFilterChange(value));
  };

  const handleStatusChange: RadioGroupProps["onChange"] = (e) => {
    const value = e.target.value;
    setStatus(value);
    dispatch(statusFilterChange(value));
  };

  const handlePriorityChange: SelectProps["onChange"] = (value) => {
    setPriority(value);
    dispatch(prioritiesFilterChange(value));
  };

  useEffect(() => {
    updateQuery();
  }, [search, status, priority]);

  return (
    <Row>
      <Col span={24}>
        <Typography.Paragraph style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}>Search</Typography.Paragraph>
        <Search allowClear placeholder="input search text" onChange={handleSearchChange} value={search} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}>Filter By Status</Typography.Paragraph>
        <Radio.Group value={status} onChange={handleStatusChange}>
          <Radio value={undefined}>All</Radio>
          <Radio value={true}>Completed</Radio>
          <Radio value={false}>To do</Radio>
        </Radio.Group>
      </Col>
      <Col xs={24}>
        <Typography.Paragraph style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}>Filter By Priority</Typography.Paragraph>
        <Select onChange={handlePriorityChange} value={priority} mode="multiple" allowClear placeholder="Please select" style={{ width: "100%" }}>
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
      </Col>
    </Row>
  );
}
