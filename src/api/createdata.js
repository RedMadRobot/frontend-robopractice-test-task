import _ from 'lodash';

export const parseClockTime = (val, sep) => val.split(sep).join(':');

const getDaysNumInMonth = (date) => {
  // eslint-disable-next-line no-unused-vars
  const [y, m, d] = date.split('-');
  const nextMonth = new Date(y, m + 1, 1); // first day of next month
  const resultMonth = new Date(nextMonth - 1); // last day of result month

  return resultMonth.getDate();
};

const buildEmptyDays = (DaysCount, DayTemplate) => {
  // eslint-disable-next-line no-unused-vars
  const [y, m, d] = DayTemplate.split('-');

  const Days = [];

  for (let i = 0; i < DaysCount; i++) {
    let index = i + 1;
    const Day = index % 10 === index ? `0${index}` : index;

    Days.push({
      Date: [y, m, Day].join('-'),
      Start: '',
      End: '',
      sumDay: 0,
    });
  }

  return Days;
};

const createEmptyData = (DaysCount, Dates, length) => {
  const emptyDataObject = {
    id: 0,
    Fullname: '',
    totalSum: null,
    Days: buildEmptyDays(DaysCount, Dates),
  };

  const res = [];
  for (let i = 0; i < length; i++) {
    res.push(emptyDataObject);
  }

  return res;
};

const toMinutes = (value, sep) => {
  const [h, m] = value.split(sep);
  return parseInt(h) * 60 + parseInt(m);
};

const countPassDiff = (Start, End) => {
  const startDate = toMinutes(Start, '-');
  const endDate = toMinutes(End, '-');

  return Math.abs(endDate - startDate);
};

export const getPassDate = (value, sep) => {
  const totalHours = Math.floor(value / 60);
  const totalMinutes = value % 60;

  return [totalHours, totalMinutes].join(sep);
};

export const createData = (dump) => {
  if (dump.length) {
    const { Date } = dump[0].Days[0];
    const daysNumber = getDaysNumInMonth(Date); // count days in month

    const dataEmptyTemplate = createEmptyData(daysNumber, Date, dump.length); // hold empty data dump

    return dataEmptyTemplate.map(({ id, Fullname, totalSum, Days }, i) => {
      let defaultDump = dump[i];

      id = defaultDump.id;
      Fullname = defaultDump.Fullname;

      const DefaultDays = defaultDump.Days.map(({ Start, End, Date }) => {
        const sumDay = countPassDiff(Start, End);
        totalSum += sumDay;

        return {
          Date,
          Start,
          End,
          sumDay: sumDay,
        };
      });

      const doubles = [...Days, ...DefaultDays];

      Days = _.orderBy(doubles, ['Date', 'sumDay'], ['asc', 'desc'])
        .map((item, index, self) => {
          if (
            index > 0 &&
            self[index - 1].Date === item.Date &&
            self[index - 1].sumDay > item.sumDay
          ) {
            item = null;
          }
          return item;
        })
        .filter((item) => item !== null);

      return {
        id,
        Fullname,
        Days,
        totalSum,
      };
    });
  }
};
