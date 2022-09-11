import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { ColumnsType, ColumnType } from "antd/lib/table";
import timeHelper from "utils/helpers/time.helpers";
import tableHelper from "utils/helpers/table.helpers";
import IUser from "types/IUser";
import IUserRaw from "types/IUserRaw";
import api from "api/api";
import TableMain from "components/TableMain/TableMain";
import TableHeader from "components/TableHeader/TableHeader";
import { ResizeCallbackData } from "react-resizable";
import ResizableTitle from "components/ResizableTitle/ResizableTitle";

function App() {
  const [daysList, setDaysList] = useState(timeHelper.getDaysList(2021, 5, 0));
  const [columns, setColumns] = useState<ColumnsType<IUser>>(() => {
    if (localStorage.getItem("serverData")) {
      return [
        {
          title: "Fullname",
          dataIndex: "username",
          width: 200,
          fixed: "left",
          sorter: (a, b) => a.username.localeCompare(b.username),
        },
        ...tableHelper.createDaysColumns(daysList),
        {
          title: "Monthly total",
          dataIndex: "total",
          width: 200,
          fixed: "right",
          sorter: (a, b) =>
            timeHelper.timeToMinutes(a.total) -
            timeHelper.timeToMinutes(b.total),
        },
      ];
    } else {
      return [
        {
          title: "Fullname",
          dataIndex: "username",
          width: 200,
          fixed: "left",
          sorter: (a, b) => a.username.localeCompare(b.username),
        },
      ];
    }
  });
  const [dataRows, setDataRows] = useState(() => {
    if (localStorage.getItem("serverData")) {
      return [
        ...tableHelper.createFullUserRows(
          JSON.parse(localStorage.getItem("serverData")!),
          daysList
        ),
      ];
    } else {
      return [
        {
          username: "max",
          key: 0,
          "1": "13",
          "2": "14",
          total: "600",
        },
      ];
    }
  });
  const [filteredRows, setFilteredRows] = useState(dataRows);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredRows(dataRows);
    }
  };

  const handleSearch = (inputValue: string) => {
    if (searchText === "") {
      setFilteredRows(dataRows);
    } else {
      setFilteredRows(
        [...dataRows].filter((userData: IUser) =>
          userData.username.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };

  const mergeColumns: ColumnsType<IUser> = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: (column as ColumnType<IUser>).width,
      onResize: handleResize(index),
    }),
  }));

  const updateStates = (data: IUserRaw[]): void => {
    setColumns([
      {
        title: "Fullname",
        dataIndex: "username",
        width: 200,
        fixed: "left",
        sorter: (a, b) => a.username.localeCompare(b.username),
      },
      ...tableHelper.createDaysColumns(daysList),
      {
        title: "Monthly total",
        dataIndex: "total",
        width: 200,
        fixed: "right",
        sorter: (a, b) =>
          timeHelper.timeToMinutes(a.total) - timeHelper.timeToMinutes(b.total),
      },
    ]);
    const rows = [...tableHelper.createFullUserRows(data, daysList)];
    setDataRows(rows);
    setFilteredRows(rows);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await api.fetchData();
      updateStates(JSON.parse(data));
      return data;
    }
    if (!localStorage.getItem("serverData")) {
      fetchData();
    }
  }, [dataRows, daysList]);

  return (
    <TableMain
      title={() => (
        <TableHeader
          handleChange={handleSearchChange}
          handleSearch={handleSearch}
          inputValue={searchText}
        />
      )}
      bordered={false}
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergeColumns}
      dataSource={filteredRows}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "25", "50", "100"],
        showQuickJumper: true,
        size: "small",
      }}
      scroll={{
        x: "max-content",
        y: 600,
      }}
      showSorterTooltip={false}
    />
  );
}

export default App;
