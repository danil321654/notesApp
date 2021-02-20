import axios from "axios";
export const deleteNote = ({_id, token}) => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "DELETE_NOTE_SUCCESS"
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
      const response = await axios.post(
        `/deleteNote`,
        {_id: _id},
        {
          headers: {Authorization: token}
        }
      );
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
