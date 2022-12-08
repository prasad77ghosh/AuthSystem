import React from "react";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </div>
          <div className={styles.right}>
            <form
              className={styles.form_container}
              //  onSubmit={handleSubmit}
            >
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                name="Name"
                // onChange={handleChange}
                // value={data.firstName}
                // required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                // onChange={handleChange}
                // value={data.email}
                // required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                // onChange={handleChange}
                // value={data.password}
                // required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                // onChange={handleChange}
                // value={data.password}
                // required
                className={styles.input}
              />
              {/* {error && <div className={styles.error_msg}>{error}</div>}
              {msg && <div className={styles.success_msg}>{msg}</div>} */}
              <button type="submit" className={styles.green_btn}>
                Sing Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
