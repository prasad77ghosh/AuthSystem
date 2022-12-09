import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import Mode from "../mode/Mode";

const Navbar = () => {
  return (
    <>
      <div className={styles.main_cont}>
        <nav>
          <div className={styles.logo_cont}>
            <Link to = "/">
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
            <Mode />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
