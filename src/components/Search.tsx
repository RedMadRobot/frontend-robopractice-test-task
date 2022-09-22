import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { selectSearch } from "../redux/users/usersSelectors";
import { setSearch } from "../redux/users/usersSlice";

const Search: React.FC = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </header>
  );
};

export default Search;
