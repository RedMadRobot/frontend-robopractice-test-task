import React from "react";
import TableRowBody from "./TableRowBody";
import TableRowHead from "./TableRowHead";
import { useSelector } from "react-redux";
import { selectUsers } from "../redux/users/usersSelectors";
import { selectPaginate } from "../redux/pagination/paginationSelectors";

const Table: React.FC = () => {
  const { items, search } = useSelector(selectUsers);
  const { firstItem, lastItem } = useSelector(selectPaginate);

  return (
    <table>
      <TableRowHead />
      <tbody>
        {items
          .slice(firstItem, lastItem)
          .filter((value) =>
            value.Fullname.toLowerCase().includes(search.toLowerCase())
          )
          .map((value, index) => (
            <tr key={index}>
              <td>
                <div className="td-resize">{value.Fullname}</div>
              </td>
              <TableRowBody date={value.Days} />
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
