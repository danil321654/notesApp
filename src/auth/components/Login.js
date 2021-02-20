import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import {TextField, Button, Link} from "@material-ui/core";

import Notes from "../../notes/components/Notes";

import {login} from "../actions/login";
import {register} from "../actions/register";

const stylesObject = {
  center: {
    textAlign: "center",
    margin: "5px"
  },
  error: {
    borderRadius: "10px",
    padding: "5px",
    color: "rgba(255, 34, 34, 0.74)"
  },
  loginCenter: {
    height: "95vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    fontSize: "1.1rem",
    margin: "10px"
  }
};

const useStyles = createUseStyles(stylesObject);
const Login = ({auth, login, register, history, location}) => {
  const classes = useStyles();
  const [type, setType] = useState("Login");
  const [message, setMessage] = useState(auth.authMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => setMessage(auth.authMessage), [auth]);

  if (auth.isLoggedIn) history.push("/notes");

  const onSubmit = e => {
    e.preventDefault();
    if (type == "Register") register({username, password});
    else login({username, password});
  };

  return (
    <div className={classes.loginCenter}>
      <div>
        <h1 className={classes.center}>{type}</h1>
        {message && (
          <div className={classes.error}>
            {message == "Request failed with status code 401"
              ? "Wrong login or password"
              : message}
          </div>
        )}
      </div>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <Button style={stylesObject.button} onClick={e => onSubmit(e)}>
        {" "}
        {type}
      </Button>

      <Link
        href=""
        onClick={e => {
          e.preventDefault();
          setType(type == "Register" ? "Login" : "Register");
          setMessage("");
        }}
      >
        {type == "Register" ? "Login" : "Register"}
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, {login, register})(Login);
