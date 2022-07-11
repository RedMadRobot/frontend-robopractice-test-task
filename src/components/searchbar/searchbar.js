import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { field, rows, updateRows, copyRows } = props;
  const [search, setSearch] = useState('');

  // template data save in localstorage and update if key: hashsum changed

  const handleChange = (event) => {
    const val = event.target.value;

    if (!val) {
      setSearch('');
      updateRows(copyRows);
    } else {
      setSearch(val);
      updateRows(
        // eslint-disable-next-line react/prop-types
        rows.filter((item) =>
          item[field].toLowerCase().includes(search.toLowerCase())
        )
      );
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
      onChange={handleChange}
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
