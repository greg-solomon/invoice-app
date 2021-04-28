import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 1 | 2 | 3 | 4 | 5;
}

export const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  const { dark } = useThemeContext();

  switch (variant) {
    case 1:
      // button 2 in design spec
      return (
        <button
          {...props}
          role="button"
          className={[styles.purpleButton, props.className].join(" ")}
        >
          {props.children}
        </button>
      );
    case 2:
      // button 3 in design spec
      return (
        <button
          {...props}
          role="button"
          className={[
            styles.lightBtn,
            dark ? styles.darkLightBtn : "",
            props.className,
          ].join(" ")}
        >
          {props.children}
        </button>
      );
    case 3:
      // button 4 in design spec

      return (
        <button
          {...props}
          role="button"
          className={[
            styles.darkBtn,
            dark ? styles.darkDarkBtn : "",
            props.className,
          ].join(" ")}
        >
          {props.children}
        </button>
      );
    case 4:
      // button 5 in design spec
      return (
        <button
          {...props}
          role="button"
          className={[styles.orangeBtn, props.className].join(" ")}
        >
          {props.children}
        </button>
      );
    case 5:
    default:
      // button 6 in design spec
      return (
        <button
          role="button"
          {...props}
          className={[
            styles.longBtn,
            dark ? styles.darkLongBtn : "",
            props.className,
          ].join(" ")}
        >
          {props.children}
        </button>
      );
  }
};
