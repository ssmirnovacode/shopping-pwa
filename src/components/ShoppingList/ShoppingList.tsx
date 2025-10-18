import { DAFAULT_SHOP_ID, LIST } from "../../utils/constants";
import { ListItem } from "./ListItem";
import "./ShoppingList.scss";

type Props = {
  shopId: string;
};
export const ShoppingList = ({ shopId = DAFAULT_SHOP_ID }: Props) => {
  // @TODO fetch list for the shop

  return (
    <ul className="shoppingList">
      {LIST.sort((a, b) => +b.isActive - +a.isActive).map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
