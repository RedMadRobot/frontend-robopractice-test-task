const getDate = (date: string) =>
  Number(new Date(0, 0, 0, Number(date.split('-')[0]), Number(date.split('-')[1])));

const getDifferenceTimes = (endDate: string, startDate: string) => {
  const different = getDate(endDate) - getDate(startDate);

  const hours = Math.floor((different % 86400000) / 3600000);
  const minutes = Math.round(((different % 86400000) % 3600000) / 60000);
  return hours + ':' + minutes;
};

export { getDifferenceTimes };
