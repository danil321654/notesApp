export const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_NOTE_SUCCESS":
      return {
        ...state
      };
      break;
    case "ADD_NOTE_SUCCESS":
      return {
        ...state
      };
      break;
    default:
      return state;
  }
};
