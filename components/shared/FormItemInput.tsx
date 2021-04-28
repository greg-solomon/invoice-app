import React, { ChangeEvent } from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { Item } from "../../types";
import { Input } from "../ui/Input";
import styles from "./styles/FormItemList.module.scss";

interface FormItemInputProps {
  item?: Item;
  onDelete: () => void;
  onQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormItemInput: React.FC<FormItemInputProps> = ({
  item,
  onDelete,
  onNameChange,
  onQuantityChange,
}) => {
  const { dark } = useThemeContext();
  const [quantity, setQuantity] = React.useState(item?.quantity || 1);
  const [price, setPrice] = React.useState<number>(item?.price || 0);
  const [total, setTotal] = React.useState(price * quantity);

  React.useEffect(() => {
    setTotal(price * quantity);
  }, [quantity, price]);

  const nameProps = {
    value: item?.name,
    label: "Item Name",
    onChange: onNameChange,
    className: styles.nameInput,
  };

  const quantityProps = {
    value: quantity,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setQuantity(+e.target.value),
    label: "Qty.",
  };

  const priceProps = {
    value: price.toFixed(2),
    onChange: (e: ChangeEvent<HTMLInputElement>) => setPrice(+e.target.value),
    label: "Price",
  };

  const totalProps = {
    label: "Total",
    disabled: true,
    value: total.toFixed(2),
    onChange: () => {},
  };
  return (
    <div className={styles.item}>
      <Input {...nameProps} />
      <div
        className={[styles.priceInfo, dark ? styles.darkPriceInfo : ""].join(
          " "
        )}
      >
        <Input {...quantityProps} />
        <Input {...priceProps} onChange={(e) => onQuantityChange(e)} />
        <Input {...totalProps} />
        <button onClick={onDelete} className={styles.deleteBtn}>
          <DeleteSVG />
        </button>
      </div>
    </div>
  );
};

const DeleteSVG = () => (
  <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
      fillRule="nonzero"
    />
  </svg>
);
