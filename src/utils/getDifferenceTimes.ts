const getDate = (date: string | null) => {
  return typeof date !== 'string'
    ? 0
    : Number(new Date(0, 0, 0, Number(date.split('-')[0]), Number(date.split('-')[1])));
};

const getDifferenceTimes = (endDate: string, startDate: string) => {
  const different = getDate(endDate) - getDate(startDate);

  if (different === 0) {
    return 0;
  }

  const hours = Math.floor((different % 86400000) / 3600000);
  const minutes = Math.round(((different % 86400000) % 3600000) / 60000);
  return hours + ':' + minutes;
};

export { getDifferenceTimes };
