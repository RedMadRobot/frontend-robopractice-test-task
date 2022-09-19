import BasicTable from './table';
import React, { useEffect } from 'react';
import getUsers from '../api/getUsers.js';
import { useDispatch } from 'react-redux';
import { addUsers } from '../store/usersSlice.js';

const getMaxDayMonth = (date) => {
    const [year, month] = date.split('-');
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
};

const getFormattedUsers = (usersAndDays) => {

    const users = usersAndDays.map(({id, Fullname, Days}) => {
        let totalHours = 0;
        let fullMonth = null;
        Days.forEach(({Date, Start, End}) => {
            const [day] = Date.split('-').reverse();
            if (!fullMonth) {
                fullMonth = new Array(getMaxDayMonth(Date));
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
            totalHours += hours;
            fullMonth[numberDay - 1] = hours;
        });

        return {id, fullName: Fullname, fullMonth, totalHours};
    });
    return users;
};
const loadUsers = async (dispatch) => {
    const usersAndDays = await getUsers();
    const users = getFormattedUsers(usersAndDays);
    dispatch(addUsers(users));
};
export const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        loadUsers(dispatch);
      }, []);
    return <BasicTable />
}
