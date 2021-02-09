import axios from "axios";
export const addNote = ({note, token}) => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "ADD_NOTE_SUCCESS"
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "ERROR",
        payload: {
          error: err
        }
      });
      return err;
    };
    try {
      const response = await axios.post(`/note`, note, {
        headers: {Authorization: token}
      });
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
