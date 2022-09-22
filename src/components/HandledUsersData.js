import { daysInMonth } from './UsersTable/utils/constants';

export default function HandledUsersData(data) {
  const handledData = data.map((item) => {
    const { id, Fullname, Days } = item;
    const info = { id, Fullname, key: id, montlyTotal: 0, };
    for (let i = 1; i <= daysInMonth; i++) {
      info[i] = 0;
      Days.forEach((oneDay) => {
        const { Date: date, End, Start } = oneDay;
        const monthDay = new Date(date); 
        info[monthDay.getDate()] = timeToHour(interval(date, Start, End));
      });

      // info.montlyTotal = calcTotal(
      //   (info[monthDay.getDate()] = interval(date, Start, End))
      // );
      // timeToHour(info);
      
    }
    
    return info;
  });
  // console.log(handledData);
  return handledData;
}

function interval(date, start, end) {
  const startTime = new Date(date + ' ' + start.replace(/-/g, ':'));
  const endTime = new Date(date + ' ' + end.replace(/-/g, ':'));
  const usedTime = endTime - startTime;
  return usedTime;
}

function timeToHour(time) {
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  const newTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return newTime;
}

function calcTotal(user) {
  let total = 0;
  for (let i = 1; i <= daysInMonth; i++) {
    total += user[i];
  }
  return total;
}

// function interval(date, start, end) {
//   const startTime = new Date(date + ' ' + start.replace(/-/g, ':'));
//   const endTime = new Date(date + ' ' + end.replace(/-/g, ':'));
//   const usedTime = endTime - startTime;
//   const hours = Math.floor((usedTime / (1000 * 60 * 60)) % 24);
//   let minutes = Math.floor((usedTime / (1000 * 60)) % 60);
//   const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
//   return time;
// }

function sumСount(arr) {arr.reduce((sum, current) => sum + current, 0)};