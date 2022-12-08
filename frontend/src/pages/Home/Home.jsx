import React from 'react'
import styles from "./Home.module.css"
import nature from "../../../images/nature.jpg"

const Home = () => {
  return (
    <>
      <div className={styles.hero_cont}>
        <div className={styles.left_cont}>
          <h1>Go Green</h1>
          <h2>Nature is the best teacher.</h2>
          <p>
            In nature, nothing is perfect and everything is perfect. Trees can
            be contorted, bent in weird ways, and they're still beautiful.
            –Alice Walker
          </p>
        </div>
        <div className={styles.right_cont}>
          <img src={nature} alt="nature" id={styles.profile_image} />
        </div>
      </div>
    </>
  );
}

export default Home
