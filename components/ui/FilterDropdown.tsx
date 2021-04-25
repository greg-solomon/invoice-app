import React from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { useToggle } from "../../lib/hooks/useToggle";
import { FilterType, ScreenType } from "../../types";
import { Checkbox } from "./Checkbox";
import styles from "./styles/FilterDropdown.module.scss";

interface FilterDropdownProps {
  screenType: ScreenType;
  filters: {
    paid: FilterType;
    pending: FilterType;
    draft: FilterType;
  };
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  screenType,
  filters,
}) => {
  const { dark } = useThemeContext();
  const [open, openHandler] = useToggle(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOff = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        openHandler.off();
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
  }, [open]);
  return (
    <div className={[styles.root, dark ? styles.darkRoot : ""].join(" ")}>
      <div onClick={openHandler.toggle}>
        {screenType === "phone" ? "Filter" : "Filter by status"}
        <svg
          width="11"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: open ? "scaleY(-1)" : "scaleY(1)",
          }}
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </div>
      {open && (
        <div
          className={[styles.dropdown, dark ? styles.darkDropdown : ""].join(
            " "
          )}
          ref={ref}
        >
          <Checkbox
            name="draft"
            label="Draft"
            onChange={filters.draft.onChange}
            checked={filters.draft.value}
          />
          <Checkbox
            name="pending"
            label="Pending"
            onChange={filters.pending.onChange}
            checked={filters.pending.value}
          />
          <Checkbox
            name="paid"
            label="Paid"
            onChange={filters.paid.onChange}
            checked={filters.paid.value}
          />
        </div>
      )}
    </div>
  );
};
