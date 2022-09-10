
const timeToMinutes = (timeString: string, separator: string = ":"): number => {
  /**
   * @param {string} timeString - time string in /[\d]{1,2}:[\d]{1,2}/ format
   * @return {number} - number of minutes
  */
  const minutes = 60;
  return timeString.split(separator).reverse().reduce((acc, current, index) => {
    acc += +current * (minutes ** (index))
    return acc;
  }, 0)
}

const minutesToTime = (minutes: number, separator: string = ":", ignoreHumanReadable: boolean = false): string => {
  /**
  * @param {boolean} ignoreHumanReadable - ban a "2:4" -> "02:04" transformation
  * @return {string} - string in /[\d]{2}:[\w]{2}/ format
  */
  const mins = minutes % 60; // 14
  const minString = `0${mins}`.slice(-2);
  const hours = (minutes - mins) / 60 // 134 - 14 = 2
  const hoursString = `0${hours}`.slice(-2);
  if (ignoreHumanReadable) return [hours, minString].join(separator);
  else return [hoursString, minString].join(separator);

}

const timeDiff = (end: string, start: string, separator: string = "-"): number => {
  /**
   * @return: number of minutes
   */
  return (timeToMinutes(end, "-") - timeToMinutes(start, "-"));
}

const timeHelper = {
  timeDiff,
  timeToMinutes,
  minutesToTime
}

export default timeHelper;
