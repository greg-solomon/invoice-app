import React from "react";
import styles from "./styles/SelectDropdown.module.scss";

interface SelectDropdownProps {
  label: string;
  name: string;
  options: { label: string; value: number }[];
  value: number;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = (props) => {
  const [currentValue, setCurrentValue] = React.useState(props.value);
  const [currentLabel, setCurrentLabel] = React.useState(
    props.options.filter((opt) => opt.value === currentValue)[0].label
  );
  return (
    <div className={styles.root}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <select>{currentLabel}</select>
    </div>
  );
};
