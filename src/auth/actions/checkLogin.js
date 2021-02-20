import axios from "axios";
export const checkLogin = token => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "LOGGED_IN_SUCCESS",
        payload: {
          success: response.success
        }
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "LOGGED_IN_ERROR",
        payload: {
          error: err
        }
      });
      return err;
    };
    try {
      const response = await axios.get(`/is_logged_in`, {
        headers: {Authorization: token}
      });
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
