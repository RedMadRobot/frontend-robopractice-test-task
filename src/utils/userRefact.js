import { DAYOFMONTH } from "./constants";

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
    debugger
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