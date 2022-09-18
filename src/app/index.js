import BasicTable from './table';
import React, { useEffect } from 'react';
import getUsers from '../api/getUsers.js';
import { useDispatch } from 'react-redux';
import { addUsers } from '../store/usersSlice.js';

const loadUsers = async (dispatch) => {
    const usersAndDays = await getUsers();
    console.log(usersAndDays);
    const users = usersAndDays.map(data => ({id: data.id, Fullname: data.Fullname}));
    dispatch(addUsers(users));
};
export const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        loadUsers(dispatch);
      }, []);
    return <BasicTable />
}
