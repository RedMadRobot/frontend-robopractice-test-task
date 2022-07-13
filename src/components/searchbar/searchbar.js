import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { field, rows, updateRows, copyRows } = props;
  const [search, setSearch] = useState('');

  const filterRows = (val, array) =>
    [...new Set(array)].filter((item) =>
      item[field].toLowerCase().includes(val.toLowerCase())
    );

  const handleChange = (event) => {
    const val = event.target.value;

    if (!val) {
      setSearch('');
      updateRows(copyRows);
    } else {
      setSearch(val);
      updateRows(filterRows(val, [...rows, ...copyRows]));
    }
  };

  const handleDelete = ({ key }) => {
    if (key === 'Delete' || key === 'Backspace') {
      updateRows(filterRows(search, copyRows));
    }
  };

  const handleClear = () => {
    setSearch('');
    updateRows(copyRows);
  };

  return (
    <TextField
      id="standard-basic"
      label="Search"
      variant="standard"
      className="search-bar"
      value={search}
      fullWidth
      onKeyDown={handleDelete}
      onInput={handleChange}
      InputProps={{
        endAdornment: !search ? (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ) : (
          <IconButton
            sx={{ visibility: search ? 'visible' : 'hidden' }}
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        ),
      }}
      sx={{
        m: 2,
        '& .Mui-focused .MuiIconButton-root': { color: 'primary.main' },
      }}
    />
  );
};

export default Searchbar;
