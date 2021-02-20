import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import {IconButton} from "@material-ui/core";

import Note from "./Note";
import NewNote from "./NewNote";
import Logout from "../../auth/components/Logout";

const stylesObject = {
  notesWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: "35px",
    paddingTop: "50px",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    overflowY: "auto",
    height: "95vh"
  },
  /*notesWrapper: {
    display: "grid",
    padding: "35px",
    gridGap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, min-content))",
    gridTemplateRows: "repeat(auto-fit, minmax(100px, min-content))",
    overflowY: "auto"
  },*/
  selectColors: {
    position: "fixed",
    marginTop: "10px",
    marginLeft: "30px"
  },
  colorButton: {
    marginTop: "5px",
    marginLeft: "20px",
    width: "30px",
    height: "20px",
    padding: 0,
    borderRadius: "5px"
  }
};

const useStyles = createUseStyles(stylesObject);

const colors = ["#f2f2f2", "#ff6363", "#fff29a", "#a4f2b1", "#85b6f1"];

function Notes({state, history}) {
  const [selectedColors, selectColors] = useState(colors);
  const classes = useStyles();

  if (!state.auth.isLoggedIn) history.push("/login");

  const [notesArr, setNotesArr] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`/notes`, {
        headers: {Authorization: state.auth.token}
      })
      .then(resp => {
        if (isMounted) setNotesArr(resp.data);
      });
    return () => {
      isMounted = false;
    };
  }, [state.app]);

  return (
    <div>
      <Logout history={history} />{" "}
      <div className={classes.selectColors}>
        {colors.map((clr, i) => (
          <IconButton
            key={i}
            onClick={() =>
              selectColors(
                selectedColors.includes(clr)
                  ? selectedColors.filter(el => el != clr)
                  : [...selectedColors, clr]
              )
            }
            style={{
              ...stylesObject.colorButton,
              backgroundColor: clr,
              border: `${selectedColors.includes(clr) ? 3 : 1}px solid black`
            }}
          ></IconButton>
        ))}
      </div>
      <div className={classes.notesWrapper}>
        {notesArr
          .filter(note => selectedColors.includes(note.color))
          .map((note, i) => (
            <Note key={i} note={note} />
          ))}
      </div>
      <NewNote />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps, null)(Notes);
