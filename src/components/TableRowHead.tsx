import React from "react";

const TableRowHead: React.FC = () => {
  return (
    <thead>
      <tr>
        <th>User</th>
        {[...new Array(31)].map((_, index) => (
          <th key={index}>{index + 1}</th>
        ))}
        <th>Monthly total</th>
      </tr>
    </thead>
  );
};

export default TableRowHead;
