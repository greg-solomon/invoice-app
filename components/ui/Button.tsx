import React from "react";
import styles from "./styles/Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 1 | 2 | 3 | 4 | 5;
}

export const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 1:
      return (
        <button {...props} className={styles.purpleButton}>
          {props.children}
        </button>
      );
    case 2:
      return (
        <button {...props} className={styles.lightBtn}>
          {props.children}
        </button>
      );
    case 3:
      return (
        <button {...props} className={styles.darkBtn}>
          {props.children}
        </button>
      );
    case 4:
      return (
        <button {...props} className={styles.orangeBtn}>
          {props.children}
        </button>
      );
    case 5:
    default:
      return (
        <button {...props} className={styles.longBtn}>
          {props.children}
        </button>
      );
  }
};
