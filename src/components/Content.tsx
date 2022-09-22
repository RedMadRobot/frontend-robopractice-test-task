import React from "react";
import Search from "./Search";
import Table from "./Table";
import Pagintation from "./Pagintation";

const Main: React.FC = () => {
  return (
    <div className="page">
      <Search />
      <Table />
      <Pagintation />
    </div>
  );
};

export default Main;
