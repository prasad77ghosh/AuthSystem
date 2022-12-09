import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLogin } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.LoginReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch({
        type: "clearError",
      });
    }
    if (isAuthenticated) {
      navigate("/about");
      toast.success("Login successfully..");
    }
  }, [error, toast, dispatch, isAuthenticated]);

  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                {loading ? "Loading.." : "SignIn"}
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here ?</h1>
            <Link to="/register">
              <button type="button" className={styles.white_btn}>
                Sing Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
