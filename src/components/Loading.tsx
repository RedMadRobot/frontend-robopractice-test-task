import React from "react";
import spinner from "../assets/spinner.gif";

const Loading: React.FC = () => {
  return <img className="spinner" src={spinner} alt="just spinner" />;
};

export default Loading;
