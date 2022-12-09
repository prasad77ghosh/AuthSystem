import React from "react";
import { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { passwordReset } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const param = useParams();
  const { loading, success, error } = useSelector(
    (state) => state.PasswordReducer
  );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordReset(param.token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch({
        type: "clearError",
      });
    }
    if (success) {
      navigate("/login");
      toast.success("Password Reset Successfully..");
    }
  }, [error, toast, dispatch, success]);

  return (
    <>
      <div className={styles.forgot_cont}>
        <form onSubmit={handleSubmit} className={styles.fogot_form}>
          <h1>Reset Password</h1>
          <input
            type="password"
            placeholder="Reset Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.green_btn}>
            {loading ? "Loading.." : "ResetPassword"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
