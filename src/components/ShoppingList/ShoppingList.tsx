import { useEffect, useState } from "react";
import { DAFAULT_SHOP_ID } from "../../utils/constants";
import { ListItem } from "./ListItem";
import "./ShoppingList.scss";
import type { ShoppingListItem } from "../../utils/types";
import { getAllShoppingItems } from "../../api/items-service";

type Props = {
  shopId: string;
};
export const ShoppingList = ({ shopId = DAFAULT_SHOP_ID }: Props) => {
  const [items, setItems] = useState<ShoppingListItem[] | undefined>();

  useEffect(() => {
    getAllShoppingItems()
      .then((data) => setItems(data.sort((a, b) => +b.isActive - +a.isActive)))
      .catch(() => console.error("Error in fetching shopping items"));
  }, [shopId]);

  if (!items) return <p>No items found on this list</p>;

  return (
    <ul className="shoppingList">
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
