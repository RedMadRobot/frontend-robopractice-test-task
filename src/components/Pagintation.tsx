import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRowsPerPage,
  onClickNextPage,
  onClickPrevPage,
} from "../redux/pagination/paginationSlice";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { selectLength } from "../redux/users/usersSelectors";
import { selectPaginate } from "../redux/pagination/paginationSelectors";
import { AppDispatch } from "../redux/store";

const Pagintation: React.FC = () => {
  const itemsLength = useSelector(selectLength);
  const { firstItem, lastItem } = useSelector(selectPaginate);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="footer">
      <span>Rows per page: </span>
      <select onChange={(e) => dispatch(setRowsPerPage(+e.target.value))}>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <span>
        {firstItem + 1}-{lastItem > itemsLength ? itemsLength : lastItem} of{" "}
        {itemsLength}
      </span>

      <button
        disabled={firstItem === 0 ? true : false}
        onClick={() => dispatch(onClickPrevPage())}
      >
        <MdOutlineArrowBackIosNew size={15} />
      </button>
      <button
        disabled={lastItem > 72 ? true : false}
        onClick={() => dispatch(onClickNextPage())}
      >
        <MdOutlineArrowForwardIos size={15} />
      </button>
    </div>
  );
};

export default Pagintation;
