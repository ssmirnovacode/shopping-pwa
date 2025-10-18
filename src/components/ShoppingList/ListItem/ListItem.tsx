import { useState, type ChangeEvent, type InputEvent } from "react";
import type { ShoppingListItem } from "../../../utils/types";
import "./ListItem.scss";

type Props = {
  item: ShoppingListItem;
};

export const ListItem = ({ item }: Props) => {
  const [values, setValues] = useState({
    price: item.price,
    quantity: item.quantity,
  });

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((values) => ({ ...values, price: Number(e.target.value) }));
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((values) => ({ ...values, quantity: Number(e.target.value) }));
  };
  return (
    <li className="listItem">
      <div className="name">{item.name}</div>
      <div className="quantity">
        <input
          id="input-quantity"
          type="number"
          onChange={handleQuantityChange}
          value={values.quantity}
        />
      </div>
      <div className="price">
        <input
          id="input-price"
          type="number"
          onChange={handlePriceChange}
          value={values.price}
        />
      </div>
      <button className="add">Add</button>
      <button className="delete">Dlt</button>
    </li>
  );
};
