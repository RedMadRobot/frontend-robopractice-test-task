export const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

export const getYearFromData = (string) => {
    //простой случай когда дата всегда в формате "2021-05-13"
    return Number(string.split("-")[0]);
};
export const getMonthFromData = (string) => {
    //простой случай когда дата всегда в формате "2021-05-13"
    return Number(string.split("-")[1]);
};
export const getDayFromData = (string) => {
    //простой случай когда дата всегда в формате "2021-05-13"
    return Number(string.split("-")[2]);
};

export const convertMinutesToHours = (timeInMinutes) => {
    const hours = Math.trunc(timeInMinutes / 60);
    const minutes = timeInMinutes - hours * 60;
    return `${hours}:${minutes}`;
};

export const getTimeDifference = (start, end) => {
    //простой случай когда дата всегда есть в формате End: "17-20" 1040, Start: "12-52" 772
    const startArray = start.split("-");
    const startMinutes = Number(startArray[0]) * 60 + Number(startArray[1]);
    const endArray = end.split("-");
    const endMinutes = Number(endArray[0]) * 60 + Number(endArray[1]);
    const minutesDiff = Math.abs(startMinutes - endMinutes);
    return [convertMinutesToHours(minutesDiff), minutesDiff];
};

export const getCurrentTimePeriod = (data) => {
    return data[0].Days[0].Date;
};

export const getDaysInCurrentMonth = (data) => {
    const currentDate = getCurrentTimePeriod(data);
    const currentYear = getYearFromData(currentDate);
    const currentMonth = getMonthFromData(currentDate);
    return Number(getDaysInMonth(currentMonth, currentYear));
};

export const getColumnsForTable = (days) => {
    const newColumns = [{ field: "Fullname", headerName: "User", width: 200 }];
    for (let i = 1; i <= days; i++) {
        newColumns.push({ field: `${i}`, headerName: `${i}` });
    }
    newColumns.push({ field: "total", headerName: "Monthly total" });
    return newColumns;
};
