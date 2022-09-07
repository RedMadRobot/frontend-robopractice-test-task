import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MyTable() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const monthDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const getWorkedDays = (user) => {
      return user.Days.map((day) =>(
        new Date(day.Date).getDate()
      ));
    }

    const getUserMonthActivity = (user) => {
      let userMonthActivity = new Array(31);
      let differenses = monthDays.filter(x => getWorkedDays(user).indexOf(x) === -1)

      for(let i = 1; i <= userMonthActivity.length; i++) {

        if(differenses.includes(i)) {
          userMonthActivity[i - 1] = "0"
        } else if (user.Days.find((day) => new Date(day.Date).getDate() === i && user.Days.find((day) => new Date(day.Date).getDate() != undefined))) {
          let start = user.Days.find((day) => new Date(day.Date).getDate() === i).Start
          let end = user.Days.find((day) => new Date(day.Date).getDate() === i).End
          userMonthActivity[i - 1] = calculateTime(start, end); 
        }
      }
      return userMonthActivity;
    }

    const getMinutesFromDate = (date) => {
      let splitedDate = date.split("-");
      return +splitedDate[0] * 60 + +splitedDate[1];
    }

    const calculateTime = (start,end) => {
      let endMinutes = getMinutesFromDate(end);
      let startMinutes = getMinutesFromDate(start);

      let delta  = endMinutes - startMinutes;

      let resultHours = addInsignificantZero(String(Math.floor(delta/60)));
      let resultMinutes = addInsignificantZero(String(delta % 60));
      
      return  resultHours + ':' + resultMinutes
    }

    const addInsignificantZero = (number) => {
      if(String(number).length === 1) {
        return '0' + number;
      }
      return number;
    }

    const getTotalTime = (days) => {
      let total = 0;
      days.map(day => (
        total +=  getMinutesFromDate(day.End) - getMinutesFromDate(day.Start)
      ))
      
      let totalHours = addInsignificantZero(String(Math.floor(total/60)));
      let totalMinutes = addInsignificantZero(String(total % 60));

      return totalHours + ':' + totalMinutes;
    }

  return (
  <Paper>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            {monthDays.map(monthDay => (
              <TableCell key = {monthDays.indexOf(monthDay) + 1}>{monthDays.indexOf(monthDay) + 1}</TableCell>
            ))}
            
            <TableCell>Monthly</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (

            <TableRow
              key={user.id}
            >
              <TableCell component="th" scope="row">
                {user.Fullname}
              </TableCell>

              
              {getUserMonthActivity(user).map((day, index) => (
                  <TableCell key={user.id + day + index } align="right">{getUserMonthActivity(user)[index]}</TableCell>
                ))}

              <TableCell align="right">{getTotalTime(user.Days)}</TableCell>

           </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}