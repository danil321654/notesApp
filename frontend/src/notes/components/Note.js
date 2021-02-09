import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {deleteNote} from "../actions/deleteNote";

import moment from "moment";

const stylesObject = {
  wrapper: {
    border: "3px solid rgba(32, 32, 32, 0.7)",
    borderRadius: "5px",
    minWidth: "100px",
    maxWidth: "400px",
    minHeight: "max-content",
    padding: "10px",
    margin: "5px",
    display: "flex",
    flexDirection: "column"
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
  deleteButton: {
    padding: "2px"
  },
  description: {
    textAlign: "justify",
    wordWrap: "break-word",
    height: "max-content"
  },
  timeWrapper: {
    marginTop: "10px",
    borderTop: "1px solid black",
    fontStyle: "italic",
    fontSize: "0.8rem",
    textAlign: "right"
  }
};

const useStyles = createUseStyles(stylesObject);

function Note({auth, note, history, deleteNote}) {
  const classes = useStyles();

  const [date, setDate] = useState(
    (() => new Date(note.createdDate))().toString()
  );

  return (
    <div className={classes.wrapper} style={{backgroundColor: note.color}}>
      <div className={classes.header}>
        <div className={classes.name}>{note.name}</div>{" "}
        <IconButton
          aria-label="delete"
          onClick={() => deleteNote({_id: note["_id"], token: auth.token})}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      <div className={classes.description}>
        {note.description.split("\n").map(str => (
          <div>{str}</div>
        ))}
      </div>
      <div className={classes.timeWrapper}>
        <div className={classes.date}>{moment(date).format("llll")}</div>
        <div className={classes.timeAgo}>
          {moment(date, "ddd MMM D YYYY hh:mm:ss").fromNow()}
        </div>
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

export default connect(mapStateToProps, {deleteNote})(Note);
