import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers/authReducer";
import {notesReducer} from "./notes/reducers/notesReducer";

export default combineReducers({auth: authReducer, app: notesReducer});
  
