import type { ShoppingListItem } from "../../../utils/types";
import "./ListItem.scss";

type Props = {
  item: ShoppingListItem;
};

export const ListItem = ({ item }: Props) => {
  return (
    <li className="listItem">
      <div className="name">{item.name}</div>
      <div className="quantity">{item.quantity}</div>
      <div className="price">{item.price}</div>
      <button className="add">Add</button>
      <button className="delete">Dlt</button>
    </li>
  );
};
