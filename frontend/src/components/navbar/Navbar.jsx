import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import Mode from "../mode/Mode";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../actions/AuthAction";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.LogoutReducer);
  const { isAuthenticated } = useSelector((state) => state.AuthCheckReducer);
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(LogoutUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch({
        type: "clearError",
      });
    }
    if (data.msg) {
      toast.success("logout successfully..");
      navigate("/");
    }
  }, [error, toast, dispatch, data]);

  return (
    <>
      <div className={styles.main_cont}>
        <nav>
          <div className={styles.logo_cont}>
            <Link to="/">
              <h1>Green</h1>
            </Link>
          </div>

          <ul className={styles.links_cont}>
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about">
              <li>UserInfo</li>
            </NavLink>
            <NavLink to="/dashboard">
              <li>DashBoard</li>
            </NavLink>
          </ul>

          <div className={styles.mod_cont}>
            {isAuthenticated && (
              <>
                <p className={styles.logout} onClick={logoutUser}>
                  {/* {loading ? "Loading.." : "Logout"} */}
                  Logout
                </p>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link>
                  <p className={styles.login}>Login</p>
                </Link>
              </>
            )}

            <Mode />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
