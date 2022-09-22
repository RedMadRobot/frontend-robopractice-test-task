import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getUsersData } from "../redux/users/asyncAction";
import { selectLoading } from "../redux/users/usersSelectors";
import Content from "./Content";
import Loading from "./Loading";

const Table: React.FC = () => {
  const loading = useSelector(selectLoading);
  const dispath = useDispatch<AppDispatch>();

  useEffect(() => {
    dispath(getUsersData());
  }, [dispath]);

  return <div>{loading ? <Loading /> : <Content />}</div>;
};

export default Table;
