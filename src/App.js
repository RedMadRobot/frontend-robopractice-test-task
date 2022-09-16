import React from "react";
import { Table } from "antd";
import { getData } from "./Api/api";
import { useState, useEffect, useRef } from "react";
import { restructData, createColumns } from "./utils/userRefact";
import 'antd/dist/antd.css';
import { ResizableTitle } from "./components/ResizableTitle";


const App = () => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [currentHight, setCurrentHight] = useState(window.innerHeight)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [columns, setColumns] = useState(createColumns(searchText, searchedColumn, searchInput, handleSearch, handleReset, setSearchText, setSearchedColumn));

  useEffect(() => {
    getData()
      .then((data) => {
        const newData = restructData(data);
        setData(newData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleResizeHight = () => {
    setTimeout(() => {
      setCurrentHight(window.innerHeight);
    }, 500);
  };


  useEffect(() => {
    window.addEventListener('resize', handleResizeHight);
    return () => {
      window.removeEventListener('resize', handleResizeHight);
    };
  }, []);

  function  handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };


  const handleResize =
  (index) =>
  (_, { size }) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], width: size.width };
    setColumns(newColumns);
  };

const mergeColumns = columns.map((col, index) => ({
  ...col,
  onHeaderCell: (column) => ({
    width: column.width,
    onResize: handleResize(index),
  }),
}));

  return (
    <>
      <div className="app">
        <div className="table">
        <h4>Отчет по сотрудникам</h4>
           <Table
            loading={isLoading}
               components={{
                header: {
                  cell: ResizableTitle,
                },
              }}        
              dataSource={Data}
              columns={mergeColumns}
              pagination={{ position: ["bottomRight"] }}
              bordered={true}
              scroll={{
                y: currentHight - 160,
              }}
            />
        </div>
      </div>
    </>
  );
};
export default App;


