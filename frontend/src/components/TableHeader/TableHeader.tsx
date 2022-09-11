import React, { useEffect } from "react";
import { Input } from "antd";
import "./TableHeader.scss";

const TableHeader = (props: any) => {
  const { Search } = Input;
  useEffect(() => {
    console.log("rerender");
  }, []);
  return (
    <>
      <Search
        placeholder="Name"
        value={props.inputValue}
        onChange={props.handleChange}
        onSearch={props.handleSearch}
        allowClear
      />
      <p>Отчёт о проводимом сотрудниками времени в соц.сетях в рабочее время</p>
    </>
  );
};

export default TableHeader;
