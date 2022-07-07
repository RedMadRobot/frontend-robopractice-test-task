import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import DataTableFilter from "./components/DataTableFilter";

import {
    getDayFromData,
    convertMinutesToHours,
    getTimeDifference,
    getDaysInCurrentMonth,
    getColumnsForTable,
} from "./utils/utils";

function App() {
    const [columns, setColumns] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });

    let daysInMonth = 0;

    const transformDataAndMakeTableColumns = (data) => {
        daysInMonth = getDaysInCurrentMonth(data);
        setColumns(getColumnsForTable(daysInMonth));

        const newData = [];

        data.forEach((el) => {
            const newRow = {
                id: 0,
                Fullname: 0,
                total: 0,
            };
            for (let i = 1; i <= daysInMonth; i++) {
                newRow[i] = 0;
            }

            let totalMounthTime = 0;
            newRow.id = el.id;
            newRow.Fullname = el.Fullname;
            el.Days.forEach((item) => {
                const day = getDayFromData(item.Date);
                const timeStart = item.Start;
                const timeEnd = item.End;
                const [timePerDay, minutesPerDay] = getTimeDifference(
                    timeStart,
                    timeEnd
                );
                newRow[String(day)] = timePerDay;
                totalMounthTime += minutesPerDay;
            });
            newRow.total = convertMinutesToHours(totalMounthTime);
            newData.push(newRow);
        });

        return newData;
    };

    //сортировка по возрастанию и убыванию данных в ячейках таблицы
    //реализована в самом компоненте таблицы, реализация ниже в качестве дополнения
    const sortedTableRow = useMemo(() => {
        if (filter.sort === "total") {
            return [...tableData].sort(
                (a, b) =>
                    Number(b[filter.sort].split(":")[0]) -
                    Number(a[filter.sort].split(":")[0])
            );
        }
        if (filter.sort && filter.sort !== "total") {
            return [...tableData].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort])
            );
        }
        return tableData;
    }, [filter.sort, tableData]);

    const sortedAndSearchedTableData = useMemo(() => {
        return sortedTableRow.filter((row) =>
            row.Fullname.toLowerCase().includes(filter.query)
        );
    }, [filter.query, sortedTableRow]);

    useEffect(() => {
        fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTableData(transformDataAndMakeTableColumns(data));
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(`Ошибка: ${err.status}`);
            });
    }, []);

    return (
        <div className='App'>
            <DataTableFilter filter={filter} setFilter={setFilter} />
            <DataTable
                tableData={sortedAndSearchedTableData}
                columns={columns}
            />
        </div>
    );
}

export default App;
