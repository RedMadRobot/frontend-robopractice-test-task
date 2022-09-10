import IUserRaw from "types/IUserRaw";
import timeHelper from "./time.helpers";

const createDaysColumns = (daysArr: string[]) => {
  /**
   * @param {string[]} daysArr - dates array of current month: ["1","2"..."30","31"]
   * @returns a slice of an array containing columns with day numbers:
  */
  return daysArr.reduce((init: any, current, index) => {
    init.push({
      title: current,
      dataIndex: current,
      width: 100,
      sorter: (a: any, b: any) => timeHelper.timeToMinutes(a[current]) - timeHelper.timeToMinutes(b[current])
    });
    return init;
    },[])
};

const createRow = (userData: IUserRaw, daysArr: string[]) => {
  /**
   * @returns an object like:
   * {
   *   username: "User Name",
   *   "1": "12:34"
   *   "2": "0" - если нет данных
   *   ...
   *   "31" : "1:12",
   *   key: _id
   *   total: number
   * }
  */
  const objTemplate: any = {
    username: userData.Fullname ,
    key: userData.id,
    total: 0
  };
  for (const day of daysArr) objTemplate[day] = "00:00";

  for (const day of userData.Days) {
    let dayOfMonth: number;
    objTemplate.total += timeHelper.timeDiff(day.End, day.Start);
    if (day.Date.match(/[\d]{2,4}-[\d]{2}-[\d]{2}/gi)) {
      dayOfMonth = Number(day.Date.split("-").at(-1));
      objTemplate[dayOfMonth] = timeHelper.minutesToTime(timeHelper.timeDiff(day.End, day.Start));
    }
  }

  objTemplate.total = timeHelper.minutesToTime(objTemplate.total,":", true);
  return objTemplate;
}

const createFullUserRows = (data: IUserRaw[], daysArr: string[]) => {
  /**
   * @returns {IUser[]} fully filled table rows
  */
  return data.reduce((init: any, current, index) => {
    init.push(createRow(current, daysArr));
    return init;
  },[])

}

const tableHelper = {
  createDaysColumns,
  createFullUserRows
}

export default tableHelper;