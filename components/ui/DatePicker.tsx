import React from "react";
import { useToggle } from "../../lib/hooks/useToggle";
import { getDaysInMonth, format, getMonth, getYear } from "date-fns";

import styles from "./styles/DatePicker.module.scss";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // initial values
  const initialSelectedDate = new Date(props.value || Date.now());
  const initialCurrentMonth = new Date(initialSelectedDate).getMonth();
  const initialCurrentYear = getYear(new Date(props.value));
  const initialDaysInMonth = getDaysInMonth(
    new Date(initialCurrentYear, initialCurrentMonth)
  );

  const [open, openHandlers] = useToggle();
  const [selectedDate, setSelectedDate] = React.useState(initialSelectedDate);
  const [currentMonth, setCurrentMonth] = React.useState(initialCurrentMonth);
  const [currentYear, setCurrentYear] = React.useState(initialCurrentYear);
  const [daysInMonth, setDaysInMonth] = React.useState(initialDaysInMonth);

  const resetDaysInMonthEffect = () => {
    setDaysInMonth(getDaysInMonth(new Date(currentYear, currentMonth)));
  };

  // close datepicker on click outside of the datepicker
  const clickOffEffect = () => {
    const handleClickOff = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        openHandlers.off();
      }
    };

    if (open) {
      window.addEventListener("click", handleClickOff);
    } else {
      window.removeEventListener("click", handleClickOff);
    }
    return () => {
      window.removeEventListener("click", handleClickOff);
    };
  };

  React.useEffect(resetDaysInMonthEffect, [currentMonth]);
  React.useEffect(clickOffEffect, [open]);

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
    setSelectedDate(new Date(currentYear, currentMonth, selectedDay));
    openHandlers.off();
  };

  return (
    <div className={styles.root} ref={ref}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          {...props}
          className={styles.input}
          readOnly={true}
          onFocus={openHandlers.on}
          value={format(new Date(selectedDate), "dd MMM yyyy")}
        />
        <img
          src="/assets/icon-calendar.svg"
          alt="Calendar Icon"
          className={styles.calendarIcon}
        />
      </div>
      <input type="date" />
      {open && (
        <div className={styles.picker}>
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
