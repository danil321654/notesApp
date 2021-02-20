import axios from "axios";
export const register = user => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: {
          user: user
        }
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "REGISTER_ERROR",
        payload: {
          error: err.data.msg ? err.data.msg : err.message
        }
      });
      return err;
    };
    try {
      const response = await axios.post(`/register`, user);
      if (response.data.success) return onSuccess(response);
      else return onError(response);
    } catch (err) {
      return onError(err);
    }
  };
};
