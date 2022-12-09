import React from "react";
import { useState, useEffect } from "react";
import styles from "./Forgot.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { passwordForgot } from "../../actions/AuthAction";
const Forgot = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.PasswordReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordForgot(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
    }
  }, [error, toast, dispatch, message]);

  return (
    <>
      <div className={styles.forgot_cont}>
        <form onSubmit={handleSubmit} className={styles.fogot_form}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.green_btn}>
            {loading ? "Loading.." : "Get Recovery Link"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgot;
