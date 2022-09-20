import { DayType } from '@/types';
import { getDifferenceTimes } from './getDifferenceTimes';

export const getCountTimes = (days: DayType[]) => {
  const times = [] as any;

  days.forEach((day) => {
    if (typeof day.End === 'string' && typeof day.Start === 'string') {
      times.push(getDifferenceTimes(day.End, day.Start));
    }
  });

  let totalH = 0;
  let totalM = 0;

  times.forEach((time: string) => {
    const splitTime = time.split(':');
    totalH += Number(splitTime[0]);
    totalM += Number(splitTime[1]);
  });

  return parseFloat(String(totalH + totalM / 60)).toFixed(2);
};
