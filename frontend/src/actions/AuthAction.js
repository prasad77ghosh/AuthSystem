import http from "../http";

// login call
export const userLogin = (email, password) => async (dispatch) => {
  console.log(email, password);
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
          error.response.data.message &&
          error.response.data.message) ||
        error.message ||
        error.toString()
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


  export const checkAuth = () => async (dispatch) => {
    const url = `auth_api/v1/authchecker`;
    try {
      dispatch({
        type: "authCheckRequest",
      });

      const { data } = await http.get(url);
      dispatch({
        type: "authCheckSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "authCheckFailure",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) 
      });
    }
  };

    export const LogoutUser = () => async (dispatch) => {
      const url = `auth_api/v1/logout`;
      try {
           await http.delete(url);
        dispatch({
          type: "logoutUserSuccess",
        });
      } catch (error) {
        dispatch({
          type: "logoutUserFailure",
          payload:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    };


    //forgot password
export const passwordForgot = (email) => async (dispatch) => {
  const url = "auth_api/v1/password/forgot";
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await http.post(url, { email });
    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};


//reset password
export const passwordReset =
  (token, password, confirmPassword) => async (dispatch) => {
    const url = `auth_api/v1/user/password/reset/${token}`;

    try {
      dispatch({
        type: "resetPasswordRequest",
      });

      const { data } = await http.put(url, {
        password,
        confirmPassword,
      });
      dispatch({
        type: "resetPasswordSuccess",
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFail",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };



