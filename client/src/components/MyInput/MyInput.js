import React from "react";
import classes from "./MyInput.module.css";

function MyInput(props) {
    return <input className={classes.myInput} {...props} />;
}

export default MyInput;
