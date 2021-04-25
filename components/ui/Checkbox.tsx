import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/Checkbox.module.scss";

interface CheckboxProps {
  name: string;
  label: string;
  onChange: () => void;
  checked: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { dark } = useThemeContext();
  return (
    <div
      className={[styles.root, dark ? styles.dark : ""].join(" ")}
      onClick={props.onChange}
    >
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
