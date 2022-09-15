import React from "react";
import { Table } from "antd";
import { getData } from "./Api/api";
import { useState, useEffect } from "react";
import { restructData } from "./utils/userRefact";
import 'antd/dist/antd.css';
import { DAYOFMONTH } from "./utils/constants";

const App = () => {
  const [Data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData()
      .then((data) => {
        console.log(data);
        const newData = restructData(data);
        setData(newData);
        setColumns(createColumns);
        console.log(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  function createColumns() {
    const columns = [
      {
        key: "id",
        title: "ФИО",
        dataIndex: "Fullname",
        width: 150,
        fixed: 'left',
      }]
      for(let i=1; i <= DAYOFMONTH ; i++) {
        const newRecord = {
          title: i,
          dataIndex: i,
          sorter: (a, b) => a[i] - b[i],
          sortDirections: ['ascend', 'descend'],  
          width: 100,
        }
        columns.push(newRecord);
      }
      columns.push(
      {
        title: "Всего",
        dataIndex: "total",
        align: "right",
        fixed: 'right',
        width: 100,
      })

    return columns;
  }

  return (
    <>
      <div className="app">
        <div className="table">
          {isLoading ? (
            <h2>Идет загрузка</h2>
          ) : (
            <Table
              dataSource={Data}
              columns={columns}
              pagination={{ position: ["bottomRight"] }}
              bordered={true}
              scroll={{
                x: 1000,
                y: 1000,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default App;


