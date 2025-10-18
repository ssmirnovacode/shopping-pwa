import { useEffect, useState } from "react";
import { DAFAULT_SHOP_ID } from "../../utils/constants";
import { ListItem } from "./ListItem";
import "./ShoppingList.scss";
import type { ShoppingListItem } from "../../utils/types";
import { getAllShoppingItems, setShoppingItem } from "../../api/items-service";
import { CreateItem } from "./CreateItem/CreateItem";

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

  const handleCreateNewItem = async (id: string, text: string) => {
    const newItem: ShoppingListItem = {
      id,
      shopId,
      name: text,
      quantity: 1,
      price: 1, // @TODO
      isActive: true,
    };
    await setShoppingItem(newItem);
    setItems([newItem, ...(items ?? [])]);
  };

  if (!items) return <p>No items found on this list</p>;

  return (
    <>
      <ul className="shoppingList">
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
      <CreateItem onCreate={handleCreateNewItem} />
    </>
  );
};
