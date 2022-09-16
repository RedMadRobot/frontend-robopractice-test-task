import { DAYOFMONTH } from "./constants";
import { getColumnSearchProps } from "../components/ColumnSearch";

export function restructData(data) {
    const newData = data.map(item => {
        const user = {};
        user["id"] = item.id;
        user["Fullname"] = item.Fullname;
        for (let i = 1; i <= DAYOFMONTH; i++) {
            user[i] = 0;
        }
        item.Days.forEach(dayOfMonth => {
            user[numberOfDay(dayOfMonth.Date)] = countOfMinutes(dayOfMonth.Date, dayOfMonth.Start, dayOfMonth.End);
        })
        user.total = calcTotal(user);
        return user; 

    })
    return newData;
}

function numberOfDay(dateOfCalc) {
    const day = new Date(dateOfCalc);
    return day.getDate();
}

function countOfMinutes (date, start, end) {
    const timeOfStart = new Date(date + ' ' + start.replace(/-/g,':'));
    const timeOfEnd = new Date(date + ' ' + end.replace(/-/g,':'));
    return (timeOfEnd-timeOfStart)/60000;
}

function calcTotal(user) {
    let total = 0;
    for (let i=1;i <= DAYOFMONTH; i++) {
        total += user[i];
    }
    return total;
}

export function createColumns(searchText, searchedColumn, searchInput, handleSearch, handleReset, setSearchText, setSearchedColumn) {
    const columns = [
      {
        key: "id",
        title: "User",
        dataIndex: "Fullname",
        width: 200,
        fixed: 'left',
        ...getColumnSearchProps('Fullname', searchText, searchedColumn, searchInput, handleSearch, handleReset, setSearchText, setSearchedColumn),
          }]
      for(let i=1; i <= DAYOFMONTH ; i++) {
        const newRecord = {
            key: "id",
            title: i,
          dataIndex: i,
          sorter: (a, b) => a[i] - b[i],
          sortDirections: ['ascend', 'descend'],  
          render:(_, record) => (
             <p>{getTimeFromMins(record[i])}</p>
          ),
          align: "right",
          width: 70,
        }
        columns.push(newRecord);
      }
      columns.push(
      {
        key: "id",
        title: "Monthly total",
        dataIndex: "total",
        render:(_, record) => (
            <p>{getTimeFromMins(record.total)}</p>
         ),
       align: "right",
        fixed: 'right',
        width: 100,
      })

    return columns;
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + ':' + String(minutes).padStart(2,'0');
};