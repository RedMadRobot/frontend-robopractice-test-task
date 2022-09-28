import BasicTable from './table/index.js';
import React, { useEffect } from 'react';
import getUsers from '../api/getUsers.js';
import { useDispatch } from 'react-redux';
import { addUsers } from '../store/usersSlice.js';
import { setMaxNumberDays } from '../store/uiSlice.js';

const getMaxDayMonth = (date) => {
    const [year, month] = date.split('-');
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
};

const getFormatUsersAndMaxNumberDays = (usersAndDays) => {
    let maxNumberDays = null;
    const users = usersAndDays.map(({id, Fullname, Days}) => {
        let monthly = 0;
        let fullMonth = null;
        Days.forEach(({Date, Start, End}) => {
            const [day] = Date.split('-').reverse();
            if (!fullMonth) {
                maxNumberDays = getMaxDayMonth(Date);
                fullMonth = new Array(maxNumberDays);
                fullMonth.fill(0);
            }

            const numberDay = Number(day)
            const [startHour, startMinu] = Start.split('-');
            const [endHour, endMinutes] = End.split('-');
            const minutesInHour = 60;
            const minutesToNextHour = minutesInHour - startMinu;
            let diffHours = endHour - startHour - 1;
            let diffMinutes = minutesToNextHour + Number(endMinutes);
            if (diffMinutes >= minutesInHour) {
                diffHours += 1;
                diffMinutes -= 60;
            }
            
            const hours = Number(`${diffHours}.${diffMinutes}`);
            monthly += hours;
            fullMonth[numberDay - 1] = hours;
        });
        const roundedMonthly = Math.round(monthly * 100)/100;
        return {id, fullName: Fullname, fullMonth, monthly: roundedMonthly};
    });
    return {users, maxNumberDays};
};

const loadUsers = async (dispatch) => {
    const usersAndDays = await getUsers();
    const {users, maxNumberDays} = getFormatUsersAndMaxNumberDays(usersAndDays);
    //console.log(users.filter((user)=>Number(user.id)===71));
    dispatch(addUsers(users));
    dispatch(setMaxNumberDays(maxNumberDays));
};

export const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        loadUsers(dispatch);
      }, []);
    return <BasicTable />
}
