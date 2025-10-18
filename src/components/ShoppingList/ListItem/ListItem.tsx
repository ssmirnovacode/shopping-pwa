import { useState, type ChangeEvent } from "react";
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

  const handleAdd = () => {
    // update data
    // isActive -> false
  };

  const handleDelete = () => {
    // remove item from DB
  };

  // toggling active status (srikethrough)
  const handleItemClick = () => {
    // toggle item isActive prop
  };

  return (
    <li className="listItem">
      <div
        onClick={handleItemClick}
        className={`name ${item.isActive ? "" : "strikethrough"}`}
      >
        {item.name}
      </div>
      <label className="label" htmlFor="input-quantity">
        Qty
      </label>
      <label className="label" htmlFor="input-price">
        Price
      </label>
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
      <button className="add" onClick={handleAdd}>
        Add
      </button>
      <button className="delete" onClick={handleDelete}>
        Dlt
      </button>
    </li>
  );
};
