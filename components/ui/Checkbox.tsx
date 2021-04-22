import React from "react";
import styles from "./styles/Checkbox.module.scss";

interface CheckboxProps {
  name: string;
  label: string;
  onChange: () => void;
  checked: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <div className={styles.root} onClick={props.onChange}>
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={() => {}}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
};
