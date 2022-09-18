import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setData } from '../store/usersSlice.js';
import Table from './table.js';
import getTime from '../helpers/getTime.js';

const App = () => {
  const dispatch = useDispatch();
  const updateData = async () => {
    const data = await axios.get('/api/users')
      .then((res) => {
        const filter = res.data.map((elem) => {
          let sumTime = 0;
          const newDays = [];
          for (let i = 1; i <= 31; i += 1) {
            newDays.push({ numDay: i, lostTime: '0' });
          }
          elem.Days.forEach((day) => {
            const numDay = new Date(day.Date).getDate();
            const hoursEnd = day.End.split('-');
            const hoursStart = day.Start.split('-');
            const t1 = Number(hoursEnd[0]) * 60 + Number(hoursEnd[1]);
            const t2 = Number(hoursStart[0]) * 60 + Number(hoursStart[1]);
            const diff = t1 - t2;
            sumTime += diff;
            const time = getTime(diff);
            const index = Number(numDay) - 1;
            newDays[index] = { numDay, lostTime: time };
          });
          const StringSumTime = getTime(sumTime);
          return {
            id: elem.id,
            name: elem.Fullname,
            days: newDays,
            sumTime: StringSumTime,
          };
        });
        return filter;
      });
    dispatch(setData(data));
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <div className="title-conteiner">
        <div className="title-content">
          <span className="red">red_mad_</span>
          robot is watching you
        </div>
      </div>
      <Table />
    </>
  );
};
export default App;
