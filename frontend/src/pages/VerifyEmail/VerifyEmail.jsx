import React from "react";
import styles from "./VerifyEmail.module.css";
import success_img from "../../images/success.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyUser } from "../../actions/AuthAction";
import { useEffect } from "react";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.VerifyEmailReducer
  );
  const param = useParams();

  const { success } = data;
  console.log(data.success)

  useEffect(() => {
    dispatch(verifyUser(param.id, param.token));
  }, [param, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch({
        type: "clearError",
      });
    }
  }, [error, toast, dispatch]);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      {success ? (
        <div className={styles.container}>
          <img
            src={success_img}
            alt="success_img"
            className={styles.success_img}
          />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default VerifyEmail;
