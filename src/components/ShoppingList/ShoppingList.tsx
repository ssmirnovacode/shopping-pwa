import { useEffect } from "react";
import { ListItem } from "./ListItem";
import "./ShoppingList.scss";
import { getAllShoppingItems } from "../../api/items-service";
import { CreateItem } from "./CreateItem/CreateItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setItems } from "../../redux/shoppingListSlice";

export const ShoppingList = () => {
  const { items, shopId } = useAppSelector((state) => state.shoppingItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllShoppingItems()
      .then((data) =>
        dispatch(setItems(data.sort((a, b) => +b.isActive - +a.isActive)))
      )
      .catch(() => console.error("Error in fetching shopping items"));
  }, [shopId]);

  if (!items.length) return;

  return (
    <>
      <CreateItem />
      <ul className="shoppingList">
        {!items.length && <p>No items found on this list</p>}
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};
