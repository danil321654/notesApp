import axios from "axios";
export const logout = token => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "LOGOUT"
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
      const response = await axios.get(`/logout`, {
        headers: {Authorization: token}
      });
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
