import React, { ChangeEvent, FormEvent } from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { useToggle } from "../../lib/hooks/useToggle";
import styles from "./styles/Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    const { dark } = useThemeContext();
    const [invalid, invalidHandlers] = useToggle();

    const handleInvalid: React.FormEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();

      const missing = (e.target as HTMLInputElement).validity.valueMissing;
      const valid = (e.target as HTMLInputElement).validity.valid;

      if (missing || !valid) {
        invalidHandlers.on();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      invalidHandlers.off();
      props.onChange(e);
    };

    const inputProps = {
      className: styles.input,
      ...props,
      onChange: handleChange,
      ref: ref,
      onInvalid: handleInvalid,
      required: true,
    };

    const rootClass = [
      styles.root,
      dark ? styles.darkRoot : "",
      className,
    ].join(" ");

    return (
      <div className={rootClass}>
        <label htmlFor={props.name} className={styles.label}>
          {label}
        </label>
        {invalid && <span className={styles.invalidLabel}>can't be empty</span>}
        <input {...inputProps} />
      </div>
    );
  }
);
