import { daysInMonth } from './UsersTable/utils/constants';

export default function HandledUsersData(data) {
  const handledData = data.map((item) => {
    const { id, Fullname, Days } = item;
    const user = { id, Fullname, key: id };
    for (let i = 1; i <= daysInMonth; i++) {
      user[i] = 0;
      Days.forEach((oneDay) => {
        const { Date: date, End, Start } = oneDay;
        const monthDay = new Date(date);
        user[monthDay.getDate()] = interval(date, Start, End);
      });
    }
    return user;
  });
  console.log(handledData);
  return handledData;
}

function interval(date, start, end) {
  const startTime = new Date(date + ' ' + start.replace(/-/g, ':'));
  const endTime = new Date(date + ' ' + end.replace(/-/g, ':'));
  const usedTime = endTime - startTime;
  const hours = Math.floor((usedTime / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((usedTime / (1000 * 60)) % 60);
  const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return time;
}
