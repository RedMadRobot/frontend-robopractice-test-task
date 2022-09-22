const dateObj = {};

/**
 * формируем коллекцию дат с порядковыми номерами
 * @param {*} begDate начальная дата
 * @param {*} endDate последняя дата
 */
const setDate = (begDate = '2021-05-01', endDate = '2021-05-31') => {
  let currentDate = new Date(begDate);
  let currentIndex = 1;
  while (currentDate <= new Date(endDate)) {
    const newDate = currentDate.toISOString().split('T')[0];
    dateObj[newDate] = currentIndex;
    currentIndex += 1;
    currentDate.setDate(currentDate.getDate() + 1);
  }
};
setDate();
const dateMap = new Map(Object.entries(dateObj));

/**
 *
 * @param {*} str время в строковом формате (например, "12-15")
 * @returns количество минут
 */
const getMinutes = (str) => {
  const strArr = str.split('-');
  return +strArr[0] * 60 + +strArr[1];
};

/**
 *
 * @param {*} begTime время начала
 * @param {*} endTime время окончания
 * @returns разница в минутах
 */
const getDiffMinutes = (begTime, endTime) => {
  const begTimeInMinutes = getMinutes(begTime);
  const endtimeInMinutes = getMinutes(endTime);
  return endtimeInMinutes - begTimeInMinutes;
};

/**
 *
 * @param {*} timeInMinutes время в минутах
 * @returns время строкой вида "15:23"
 */
const getTime = (timeInMinutes) => {
  const result = `${Math.floor(timeInMinutes / 60)}:${timeInMinutes % 60}`;
  return result;
};

export { getDiffMinutes, getTime, dateMap };
