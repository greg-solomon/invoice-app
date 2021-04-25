import React, { ChangeEvent } from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { Item } from "../../types";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import styles from "./styles/FormItemList.module.scss";

interface FormItemListProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

interface ItemInputProps {
  item?: Item;
  onDelete: () => void;
  onQuantityChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormItemList: React.FC<FormItemListProps> = ({
  items,
  setItems,
}) => {
  const { dark } = useThemeContext();

  const handleItemDelete = (i: number) => {
    setItems((prev) => prev.filter((item, index) => index !== i));
  };

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setItems((prev) =>
      prev.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            quantity: +e.target.value,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleNameChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            name: e.target.value,
          };
        }
        return item;
      })
    );
  };

  const handleItemAdd = () => {
    setItems((prev) => [
      ...prev,
      { name: "", quantity: 0, total: 0, price: 0 },
    ]);
  };

  return (
    <div className={styles.itemList}>
      <Heading variant="h2">Item List</Heading>
      {items.map((item, i) => (
        <ItemInput
          key={i}
          item={item}
          onNameChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleNameChange(i, e)
          }
          onQuantityChange={(e) => handleQuantityChange(e, i)}
          onDelete={() => handleItemDelete(i)}
        />
      ))}

      <Button
        variant={5}
        className={[styles.addNewBtn, dark ? styles.darkNewBtn : ""].join(" ")}
        onClick={handleItemAdd}
        type="button"
      >
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
            fillRule="nonzero"
          />
        </svg>{" "}
        Add New Item
      </Button>
    </div>
  );
};

const ItemInput: React.FC<ItemInputProps> = ({
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
      <Input
        value={item?.name}
        label="Item Name"
        onChange={onNameChange}
        className={styles.nameInput}
      />
      <div
        className={[styles.priceInfo, dark ? styles.darkPriceInfo : ""].join(
          " "
        )}
      >
        <Input {...quantityProps} />
        <Input {...priceProps} />
        <Input {...totalProps} />
        <button onClick={onDelete} className={styles.deleteBtn}>
          <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
              fillRule="nonzero"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
