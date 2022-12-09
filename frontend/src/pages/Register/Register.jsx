import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../actions/AuthAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, data, isEmailSended, error } = useSelector(
    (state) => state.RegisterReducer
  );

  const { success, message } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(name, email, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch({
        type: "clearError",
      });
    }
    if (isEmailSended) {
      toast.success(message);
    }
  }, [error, toast, dispatch, isEmailSended]);

  return (
    <>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sing in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                name="Name"
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                {loading ? "Loading.." : "Signup"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
