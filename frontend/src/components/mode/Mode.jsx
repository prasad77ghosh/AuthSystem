import React, { useState } from "react";
import styles from "./Mode.module.css";

const Mode = () => {
  const defaultTheme = localStorage.getItem("theme") || "theme-dark";
  const [theme, setTheme] = useState(defaultTheme);

  document.documentElement.className = defaultTheme;
  const ThemeSetting = (e) => {
    const themeValue = e.target.value || "theme-light";
    localStorage.setItem("theme", themeValue);
    setTheme(themeValue);
  };

  return (
    <div className={styles.theme_switcher_cont}>
      <select id="themeSwitcher" onChange={ThemeSetting}>
        <option value="">{theme}</option>
        <option value="theme-light">Light</option>
        <option value="theme-dark">Dark</option>
        <option value="theme-ocean">Ocean</option>
        <option value="theme-sepia">Sepia</option>
      </select>
    </div>
  );
};

export default Mode;
