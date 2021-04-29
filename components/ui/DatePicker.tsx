import React, { SetStateAction, useEffect } from "react";
import { useToggle } from "../../lib/hooks/useToggle";
import { getDaysInMonth, format, getYear } from "date-fns";
import { useThemeContext } from "../../lib/context/ThemeContext";
import styles from "./styles/DatePicker.module.scss";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  setInvoiceDate: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  setInvoiceDate,
  value,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { dark } = useThemeContext();

  // initial values
  const initialSelectedDate = value ? new Date(value) : new Date(Date.now());
  const initialCurrentMonth = new Date(initialSelectedDate).getMonth();
  const initialCurrentYear = getYear(initialSelectedDate);
  const initialDaysInMonth = getDaysInMonth(initialSelectedDate);

  // hooks
  const [open, openHandlers] = useToggle();
  const [selectedDate, setSelectedDate] = React.useState(initialSelectedDate);
  const [currentMonth, setCurrentMonth] = React.useState(initialCurrentMonth);
  const [currentYear, setCurrentYear] = React.useState(initialCurrentYear);
  const [daysInMonth, setDaysInMonth] = React.useState(initialDaysInMonth);

  useEffect(() => {
    setSelectedDate(new Date(value));
  }, [value]);

  const resetDaysInMonthEffect = () => {
    setDaysInMonth(getDaysInMonth(new Date(currentYear, currentMonth)));
  };

  const handleClickOff = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      openHandlers.off();
    }
  };

  // close datepicker on click outside of the datepicker
  const clickOffEffect = () => {
    if (open) {
      window.addEventListener("click", handleClickOff);
    } else {
      window.removeEventListener("click", handleClickOff);
    }
    return () => {
      window.removeEventListener("click", handleClickOff);
    };
  };

  const setFocus = () => {
    if (open) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  React.useEffect(resetDaysInMonthEffect, [currentMonth]);
  React.useEffect(clickOffEffect, [open]);
  React.useEffect(setFocus, [open]);

  // handlers
  const handlePrevMonth = () => {
    setCurrentMonth((curr) => {
      if (curr - 1 < 0) {
        setCurrentYear((prev) => prev - 1);
        return 11;
      } else {
        return curr - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((curr) => {
      if (curr + 1 > 11) {
        setCurrentYear((prev) => prev + 1);
        return 0;
      } else {
        return curr + 1;
      }
    });
  };

  const handleDateSelect = (selectedDay: number) => {
    const newDate = new Date(currentYear, currentMonth, selectedDay);
    setSelectedDate(newDate);
    setInvoiceDate(format(newDate, "yyyy-MM-dd"));
    openHandlers.off();
  };

  // props and styles
  const rootProps = {
    className: [styles.root, dark ? styles.darkRoot : ""].join(" "),
    ref: ref,
  };

  const pickerClass = [styles.picker, dark ? styles.darkPicker : ""].join(" ");

  const inputProps = {
    type: "text",
    ...props,
    className: styles.input,
    readOnly: true,
    onFocus: openHandlers.on,
    ref: inputRef,
    value: format(selectedDate, "dd MMM yyyy"),
  };

  return (
    <div {...rootProps}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={styles.inputWrapper}>
        <input {...inputProps} />
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.calendarIcon}
        >
          <path
            d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z"
            fillRule="nonzero"
          />
        </svg>
      </div>
      {open && (
        <div className={pickerClass}>
          <div className={styles.pickerNav}>
            <button onClick={handlePrevMonth}>
              <img src="/assets/icon-arrow-left.svg" alt="Prev Month Icon" />
            </button>
            <p>
              {format(new Date(currentYear, currentMonth), "MMM")} {currentYear}
            </p>
            <button onClick={handleNextMonth}>
              <img src="/assets/icon-arrow-right.svg" alt="Next Month Icon" />
            </button>
          </div>
          <div className={styles.days}>
            {Array.from(Array(daysInMonth).keys())
              .map((p) => p + 1)
              .map((p, i) =>
                selectedDate.getDate() === p &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth ? (
                  <p
                    key={i}
                    className={styles.selectedDay}
                    onClick={() => handleDateSelect(p)}
                  >
                    {p}
                  </p>
                ) : (
                  <p key={i} onClick={() => handleDateSelect(p)}>
                    {p}
                  </p>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};
