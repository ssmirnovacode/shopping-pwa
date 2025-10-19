import { useState } from "react";
import "./CreateItem.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { saveItem } from "../../../redux/shoppingListSlice";
import { setShoppingItem } from "../../../api/items-service";
import type { ShoppingListItem } from "../../../utils/types";
import { DAFAULT_SHOP_ID } from "../../../utils/constants";

export const CreateItem = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleCreateNewItem = async () => {
    const id = Date.now().toString();
    const newItem: ShoppingListItem = {
      id,
      shopId: DAFAULT_SHOP_ID, // @TODO add shopId to slice
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
