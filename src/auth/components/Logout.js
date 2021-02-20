import React, {useState, useEffect} from "react";

import {connect} from "react-redux";
import {logout} from "../actions/logout";
import {createUseStyles} from "react-jss";
import {IconButton} from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const stylesObject = {
  Logout: {
    position: "fixed",
    top: 0,
    left: 0
  }
};

const useStyles = createUseStyles(stylesObject);
const Logout = ({history, logout, token}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <IconButton
        aria-label="add"
        style={stylesObject.Logout}
        onClick={e => {
          logout(token);
          history.push("/login");
        }}
      >
        <ExitToAppOutlinedIcon />
      </IconButton>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {logout})(Logout);
