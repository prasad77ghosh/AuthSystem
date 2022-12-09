import React from "react";
import styles from "./About.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const About = () => {
  const { data, isAuthenticated } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }
  return (
    <>
      {data && (
        <>
          <div className={styles.userCont}>
            <h1>{data.user.name}</h1>
            <h2>{data.user.email}</h2>
          </div>
        </>
      )}
    </>
  );
};

export default About;
