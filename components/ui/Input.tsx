import React from "react";
import styles from "./styles/Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className={styles.root}>
        <label htmlFor={props.name} className={styles.label}>
          {label}
        </label>
        <input className={styles.input} {...props} ref={ref} />
      </div>
    );
  }
);
