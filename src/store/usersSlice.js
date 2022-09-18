import { createSlice } from '@reduxjs/toolkit';

const sort = (arr, type) => {
  switch (type) {
    case 'increase':
      return arr.sort((a, b) => {
        if (b.sorted < a.sorted) {
          return -1;
        }
        if (b.sorted > a.sorted) {
          return 1;
        }
        return 0;
      });
    case 'decrease':
      return arr.sort((a, b) => {
        if (b.sorted > a.sorted) {
          return -1;
        }
        if (b.sorted < a.sorted) {
          return 1;
        }
        return 0;
      });
    default: return arr;
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    idDedicatedUser: -1,
    typeSort: 'none',
    whatsort: null,
  },
  reducers: {
    setData(state, action) {
      state.data = [...action.payload];
    },
    selection(state, action) {
      state.idDedicatedUser = action.payload;
    },
    sortCollum(state, action) {
      const tableSort = {
        none: 'increase',
        increase: 'decrease',
        decrease: 'increase',
      };
      const collumnSort = action.payload;
      if (state.whatsort === collumnSort) {
        state.typeSort = tableSort[state.typeSort];
      } else {
        state.typeSort = 'increase';
      }

      const unsortArr = state.data.map((elem, index) => {
        if (collumnSort === 'Username') {
          return { index, sorted: elem.name };
        }
        if (collumnSort === 'totalTime') {
          if (elem.sumTime === '0') { return { index, sorted: 0 }; }
          const times = elem.sumTime.split(':');
          const hh = Number(times[0]);
          const mm = Number(times[1]);
          const sorted = hh * 60 + mm;
          return { index, sorted };
        }
        if (elem.days[collumnSort - 1].lostTime === '0') { return { index, sorted: 0 }; }
        const times = elem.days[collumnSort - 1].lostTime.split(':');
        const hh = Number(times[0]);
        const mm = Number(times[1]);
        const sorted = (hh * 60) + mm;
        return { index, sorted };
      });

      const sortArr = sort(unsortArr, state.typeSort);
      const sortData = sortArr.map((elem) => state.data[elem.index]);
      state.data = sortData;
      state.whatsort = collumnSort;
    },
  },
});

export const { setData, selection, sortCollum } = usersSlice.actions;
export default usersSlice.reducer;
