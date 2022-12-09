import http from "../http";

// login call
export const userLogin = (email, password) => async (dispatch) => {
  const url = "/auth_api/v1/login";
  try {
    dispatch({
      type: "loginUserRequest",
    });
    const { data } = await http.post(url, { email, password });
    dispatch({
      type: "loginUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loginUserFailure",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// register call
export const userRegister = (name, email, password, confirmPassword) => async (dispatch) => {
    const url = "auth_api/v1/register";
    try {
      dispatch({
        type: "registerUserRequest",
      });

      const { data } = await http.post(url, {
        name,
        email,
        password,
        confirmPassword,
      });

      console.log(data)
      dispatch({
        type: "registerUserSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "registerUserFailure",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };


  export const verifyUser = (id,token) => async (dispatch) => {
    console.log(id, token);
      const url = `auth_api/v1/users/${id}/verify/${token}`;
      try {
        dispatch({
          type: "verifyEmailRequest",
        });

        const { data } = await http.get(url);
        dispatch({
          type: "verifyEmailSuccess",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "verifyEmailFailure",
          payload:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    };

