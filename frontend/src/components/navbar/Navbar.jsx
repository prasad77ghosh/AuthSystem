import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import Mode from "../mode/Mode";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../actions/AuthAction";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);

  const logoutAction = () => {
    dispatch(LogoutUser());
    toast.success("Logged out successfully...");
  };

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
            {isAuthenticated ? (
              <>
                <p className={styles.logout} onClick={logoutAction}>
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link to="/login">
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
