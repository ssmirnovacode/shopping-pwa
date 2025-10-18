import { useState, type ChangeEvent } from "react";
import type { ShoppingListItem } from "../../../utils/types";
import "./ListItem.scss";
import {
  deleteShoppingItem,
  setShoppingItem,
} from "../../../api/items-service";

type Props = {
  item: ShoppingListItem;
};

export const ListItem = ({ item }: Props) => {
  const [values, setValues] = useState({
    price: item.price,
    quantity: item.quantity,
  });

  const handlePriceChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    setValues((values) => ({ ...values, price }));
    await setShoppingItem({ ...item, price });
  };

  const handleQuantityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    setValues((values) => ({ ...values, quantity }));
    await setShoppingItem({ ...item, quantity });
  };

  const handleAdd = async () => {
    // update data in analytics

    // isActive -> false
    await setShoppingItem({ ...item, isActive: false });
  };

  const handleDelete = () => {
    // remove item from DB
    deleteShoppingItem(item.id);
  };

  // toggling active status (srikethrough)
  const handleItemClick = async () => {
    // toggle item isActive prop
    await setShoppingItem({ ...item, isActive: !item.isActive });
    console.log({ item: { ...item, isActive: !item.isActive } });
  };

  return (
    <li className={`listItem ${item.isActive ? "" : "inactive"}`}>
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
      <button className="add" onClick={handleAdd} disabled={!item.isActive}>
        Add
      </button>
      <button className="delete" onClick={handleDelete}>
        Dlt
      </button>
    </li>
  );
};
