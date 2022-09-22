import { getDiffMinutes, getTime, dateMap } from './dataService.js';

const mappedUsers = (users) => {
  const result = users.map((elem) => {
    elem.key = elem.id;

    for (let [date, number] of dateMap) {
      const currentDay = elem.Days.find(({ Date }) => Date === date) || {
        Start: '00-00',
        End: '00-00',
      };
      currentDay.diffMinutes =
        getDiffMinutes(currentDay.Start, currentDay.End) || 0;
      currentDay.time = getTime(currentDay.diffMinutes);
      elem[number] = {
        time: getTime(currentDay.diffMinutes),
        num: currentDay.diffMinutes,
      };
    }
    elem.monthlyTotalNum = elem.Days.reduce(
      (t, { diffMinutes }) => t + diffMinutes,
      0
    );
    elem.monthlyTotal = getTime(elem.monthlyTotalNum);

    return elem;
  });

  return result;
};

const getColumns = () => {
  const result = [
    {
      title: 'Users',
      dataIndex: 'Fullname',
      key: 'Fullname',
      fixed: 'left',
      filterSearch: true,
      sorter: (a, b) => {
        const nameA = a.Fullname.toUpperCase(); // ignore upper and lowercase
        const nameB = b.Fullname.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      },
    },
  ];
  for (let i = 1; i <= 31; i++) {
    result.push({
      title: i,
      dataIndex: i,
      key: i,
      render: (text) => {
        return <>{text.time}</>;
      },
      sorter: (a, b) => {
        console.log(a[i], b[i]);
        const nameA = a[i].num;
        const nameB = b[i].num;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      },
    });
  }
  result.push({
    title: 'Monthly total',
    dataIndex: 'monthlyTotal',
    key: 'monthlyTotal',
    fixed: 'right',
    sorter: (a, b) => {
      const nameA = a.monthlyTotalNum;
      const nameB = b.monthlyTotalNum;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    },
  });

  return result;
};



export { mappedUsers, getColumns };
