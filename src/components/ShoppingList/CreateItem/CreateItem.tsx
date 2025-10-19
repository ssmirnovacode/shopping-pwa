import { useState } from "react";
import "./CreateItem.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { saveItem } from "../../../redux/shoppingListSlice";
import { setShoppingItem } from "../../../api/items-service";
import type { ShoppingListItem } from "../../../utils/types";

export const CreateItem = () => {
  const [text, setText] = useState("");
  const shopId = useAppSelector((state) => state.shoppingItems.shopId);
  const dispatch = useAppDispatch();

  const handleCreateNewItem = async () => {
    const id = Date.now().toString();
    const newItem: ShoppingListItem = {
      id,
      shopId,
      name: text,
      quantity: 1,
      price: 1, // @TODO
      isActive: true,
    };
    await setShoppingItem(newItem);
    dispatch(saveItem(newItem)); // @TODO unite redux calls with db calls - thunk?
    setText("");
  };

  //@TODO amplify form to set the price

  return (
    <div className="createItem">
      <input
        placeholder="Enter new item"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleCreateNewItem} disabled={!text}>
        Create
      </button>
    </div>
  );
};
