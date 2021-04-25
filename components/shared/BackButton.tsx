import { useRouter } from "next/router";
import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/BackButton.module.scss";
interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const { dark } = useThemeContext();
  const router = useRouter();

  const clickHandler = onClick ? () => onClick() : () => router.back();
  return (
    <div className={styles.backBtnWrapper}>
      <button
        className={[styles.backBtn, dark ? styles.backBtnDark : ""].join(" ")}
        onClick={clickHandler}
        role="navigation"
      >
        <img src="/assets/icon-arrow-left.svg" alt="Left Arrow" />
        <span>Go back</span>
      </button>
    </div>
  );
};
