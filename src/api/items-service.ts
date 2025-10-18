import localforage from "localforage";
import type { ShoppingListItem } from "../utils/types";

export const itemsStore = localforage.createInstance({
  name: "shoppingItems",
});

export const getShoppingItem = async (
  id: string
): Promise<ShoppingListItem | undefined> => {
  const data = await itemsStore.getItem(id);
  if (!data) {
    console.error("Data not found for selected key");
    return;
  }

  if (typeof data !== "string") {
    console.error("Invalid data in storage");
    return;
  }

  return JSON.parse(data);
};

export const setShoppingItem = async (item: ShoppingListItem) => {
  const json = JSON.stringify(item);

  await itemsStore.setItem(item.id, json);
};

export const getAllShoppingItems = async (): Promise<ShoppingListItem[]> => {
  const allItems: ShoppingListItem[] = [];

  await itemsStore.iterate((value, key) => {
    // Since you're storing stringified JSON, parse it back
    if (typeof value === "string") {
      try {
        const item = JSON.parse(value);
        allItems.push(item);
      } catch (error) {
        console.error(`Error parsing item with key ${key}:`, error);
      }
    }
  });

  return allItems;
};
