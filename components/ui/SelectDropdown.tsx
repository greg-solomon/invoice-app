import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { useToggle } from "../../lib/hooks/useToggle";
import styles from "./styles/SelectDropdown.module.scss";

interface SelectDropdownProps {
  label: string;
  name: string;
  options: { label: string; value: number }[];
  value: number;
  onChange: (n: number) => void;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = (props) => {
  const { dark } = useThemeContext();
  const ref = React.useRef<HTMLInputElement>(null);
  const [currentLabel, setCurrentLabel] = React.useState(
    props.options.filter((opt) => opt.value === props.value)[0].label
  );
  const [show, showHandlers] = useToggle();

  const handleClickOff = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      showHandlers.off();
    }
  };

  React.useEffect(() => {
    if (show) {
      window.addEventListener("click", handleClickOff);
    } else {
      window.removeEventListener("click", handleClickOff);
    }

    return () => {
      window.removeEventListener("click", handleClickOff);
    };
  }, [show]);

  const handleChange = (newValue: number) => {
    props.onChange(newValue);
    setCurrentLabel(
      props.options.filter((opt) => opt.value === newValue)[0].label
    );
  };

  const inputProps = {
    value: currentLabel,
    readOnly: true,
    onFocus: showHandlers.on,
    ref,
  };

  return (
    <div className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <div className={styles.inputWrapper}>
        <input {...inputProps} />
        <img src="/assets/icon-arrow-down.svg" alt="Down Arrow" />
      </div>
      {show && (
        <div
          className={[styles.dropdown, dark ? styles.darkShadow : ""].join(" ")}
        >
          {props.options.map((option, i) => (
            <div
              className={[styles.option, dark ? styles.darkOption : ""].join(
                " "
              )}
              onClick={() => handleChange(option.value)}
              key={i}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
