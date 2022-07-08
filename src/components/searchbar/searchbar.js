import React, { useContext } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { DataManagerContext, SearchContext } from '../context/context';
import { templateData } from '../../modules/templatedata';

const Searchbar = () => {
  // eslint-disable-next-line react/prop-types
  const { search, setSearch } = useContext(SearchContext);
  const { data, updateData } = useContext(DataManagerContext);

  // template data save in localstorage and update if key: hashsum changed

  const handleChange = (event) => {
    setSearch(event.target.value);
    updateData(
      data.filter((item) =>
        item.fullname.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleClear = () => {
    setSearch('');
    updateData(templateData);
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
