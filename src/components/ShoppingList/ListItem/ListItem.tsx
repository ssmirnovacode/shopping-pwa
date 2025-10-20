import { useState, type ChangeEvent } from "react";
import type { ShoppingListItem } from "../../../utils/types";
import "./ListItem.scss";
import {
  deleteShoppingItem,
  setShoppingItem,
} from "../../../api/items-service";
import { useAppDispatch } from "../../../redux/hooks";
import { removeItem, saveItem } from "../../../redux/shoppingListSlice";

type Props = {
  item: ShoppingListItem;
};

export const ListItem = ({ item }: Props) => {
  const [values, setValues] = useState({
    price: item.price.toString(),
    quantity: item.quantity.toString(),
  });

  const dispatch = useAppDispatch();

  const handlePriceChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    setValues((values) => ({ ...values, price: e.target.value }));
    const updatedItem = { ...item, price };
    await setShoppingItem(updatedItem);
    dispatch(saveItem(updatedItem));
  };
  // @TODO normalize inputs - dont let anything but numbers
  const handleQuantityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value);
    setValues((values) => ({ ...values, quantity: e.target.value }));
    const updatedItem = { ...item, quantity };
    await setShoppingItem(updatedItem);
    dispatch(saveItem(updatedItem));
  };

  const handleAdd = async () => {
    // update data in analytics
    const newItem = { ...item, isActive: false };
    // isActive -> false
    await setShoppingItem(newItem);
    dispatch(saveItem(newItem));
  };

  const handleDelete = () => {
    // remove item from DB
    deleteShoppingItem(item.id);
    dispatch(removeItem(item.id));
  };

  // toggling active status (srikethrough)
  const handleItemClick = async () => {
    // toggle item isActive prop
    const updatedItem = { ...item, isActive: !item.isActive };
    await setShoppingItem(updatedItem);
    dispatch(saveItem(updatedItem));
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
          onChange={handleQuantityChange}
          value={values.quantity}
        />
      </div>
      <div className="price">
        <input
          id="input-price"
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
