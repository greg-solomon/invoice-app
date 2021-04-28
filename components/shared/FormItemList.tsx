import et from "date-fns/esm/locale/et/index.js";
import React, { ChangeEvent } from "react";
import { useThemeContext } from "../../lib/context/ThemeContext";
import { Item } from "../../types";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { FormItemInput } from "./FormItemInput";
import styles from "./styles/FormItemList.module.scss";

interface FormItemListProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
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
            total: +e.target.value * item.price,
          };
        } else {
          return item;
        }
      })
    );
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    setItems((prev) =>
      prev.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            price: +e.target.value,
            total: +e.target.value * item.quantity,
          };
        }

        return item;
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
      { name: "New Item", quantity: 0, total: 0, price: 0 },
    ]);
  };

  return (
    <div className={styles.itemList}>
      <Heading variant="h2">Item List</Heading>
      {items.map((item, i) => (
        <FormItemInput
          key={i}
          item={item}
          onNameChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleNameChange(i, e)
          }
          onPriceChange={(e) => handlePriceChange(e, i)}
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
