const getDaysNumInMonth = (date) => {
  const [y, m] = date.split('-');
  const nextMonth = new Date(y, m + 1, 1); // first day of next month
  const resultMonth = new Date(nextMonth - 1); // last day of result month

  return resultMonth.getDate();
};

const buildEmptyDays = (DaysCount, DayTemplate) => {
  const yearMonth = DayTemplate.split('-', 2);

  const Days = [];

  for (let i = 0; i < DaysCount; i++) {
    let index = i + 1;
    const Day = index % 10 === index ? `0${index}` : index;

    Days.push({
      Date: [yearMonth, Day].join('-'),
      Start: '',
      End: '',
      sumDay: 0,
    });
  }

  return Days;
};

const createEmptyData = (DaysCount, DayTemplate, length) => {
  const emptyObject = {
    id: 0,
    Fullname: '',
    totalSum: 0,
    Days: buildEmptyDays(DaysCount, DayTemplate),
  };

  const res = [];
  for (let i = 0; i < length; i++) {
    res.push(emptyObject);
  }

  return res;
};

const toMinutes = (value, sep) => {
  const tempTime = value.split(sep);
  return parseInt(tempTime) * 60 + parseInt(tempTime[1]);
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
  const { Date } = dump[0].Days[0];
  const daysNumber = getDaysNumInMonth(Date); // count days in month

  const dataEmptyTemplate = createEmptyData(daysNumber, Date, dump.length); // hold empty template array
  //console.log(dataEmptyTemplate);

  return dataEmptyTemplate.map(({ id, Fullname, totalSum, Days }, i) => {
    let defaultDump = dump[i];

    id = defaultDump.id;
    Fullname = defaultDump.Fullname;

    Days = Days.map(({ Start, End, sumDay, Date }, j) => {
      if (defaultDump.Days[j]) {
        const { StartDefault, EndDefault } = defaultDump.Days[j];

        if (defaultDump.Days[j] === Date) {
          Start = StartDefault;
          End = EndDefault;
          sumDay = countPassDiff(Start, End);

          totalSum += sumDay;
        }
      }

      return {
        Date,
        Start,
        End,
        sumDay,
      };
    });

    return {
      id,
      Fullname,
      Days,
      totalSum,
    };
  });
};
