import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import {Input, TextField, IconButton, Button} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import MinimizeOutlinedIcon from "@material-ui/icons/MinimizeOutlined";

import {addNote} from "../actions/addNote";

const stylesObject = {
  wrapper: {
    border: "3px solid rgba(32, 32, 32, 0.7)",
    borderRadius: "5px",
    maxWidth: "max-content",
    height: "min-content",
    padding: "10px",
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: 0
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "flex-start"
  },
  name: {
    borderBottom: "1px solid black"
  },
  button: {
    padding: "2px"
  },
  description: {
    textAlign: "justify",
    height: "max-content",
    paddingBottom: "5px"
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  hidedwrapper: {
    position: "fixed",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    widtH: 10
  },
  minButton: {
    marginTop: "-5px",
    width: "10%",
    height: "20px",
    padding: 0
  },

  colorButton: {
    marginTop: "-5px",
    marginLeft: "10px",
    width: "10%",
    height: "20px",
    padding: 0,
    borderRadius: "5px"
  }
};

const useStyles = createUseStyles(stylesObject);

const colors = ["#f2f2f2", "#ff6363", "#fff29a", "#a4f2b1", "#85b6f1"];

function NewNote({auth, history, addNote}) {
  const classes = useStyles();

  const [hided, toggleHided] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(colors[0]);

  return hided ? (
    <div className={classes.hidedwrapper}>
      <IconButton aria-label="add" onClick={() => toggleHided(false)}>
        <AddBoxOutlinedIcon style={stylesObject.button} />
      </IconButton>
    </div>
  ) : (
    <div className={classes.wrapper}>
      <div>
        <IconButton
          aria-label="delete"
          onClick={() => toggleHided(true)}
          style={stylesObject.minButton}
        >
          <MinimizeOutlinedIcon fontSize="small" />
        </IconButton>
        {colors.map(clr => (
          <IconButton
            onClick={() => setColor(clr)}
            style={{
              ...stylesObject.colorButton,
              backgroundColor: clr,
              border: `${clr == color ? 3 : 1}px solid black`
            }}
          ></IconButton>
        ))}
      </div>
      <div className={classes.header}>
        <div className={classes.name}>
          <Input value={name} onChange={e => setName(e.target.value)} />
        </div>{" "}
        <IconButton
          aria-label="delete"
          style={stylesObject.button}
          onClick={() => {
            setName("");
            setDescription("");
            setColor(colors[0]);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div className={classes.footer}>
        <div className={classes.description}>
          {" "}
          <TextField
            value={description}
            multiline
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <IconButton
          aria-label="add"
          style={stylesObject.button}
          onClick={() => {
            if (name.length > 0 && description.length > 0) {
              addNote({note: {name, description, color}, token: auth.token});
              setName("");
              setDescription("");
            }
          }}
        >
          <AddBoxOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
// Sat Feb 06 2021 17:44:00 GMT+0300 (Moscow Standard Time)

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {addNote})(NewNote);
