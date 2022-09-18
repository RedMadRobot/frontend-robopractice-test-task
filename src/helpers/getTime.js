const getTime = (time) => {
  const hh = Math.trunc(time / 60);
  const mm = time % 60;
  return `${hh}:${mm < 10 ? '0' : ''}${mm}`;
};
export default getTime;
