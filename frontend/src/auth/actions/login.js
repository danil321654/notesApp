import axios from "axios";
export const login = user => {
  return async dispatch => {
    const onSuccess = response => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: user,
          token: response.token
        }
      });
      return response;
    };

    const onError = err => {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          error: err
        }
      });
      return err;
    };
    try {
      const response = await axios.post(`/login`, user);
      return onSuccess(response.data);
    } catch (err) {
      return onError(err);
    }
  };
};
