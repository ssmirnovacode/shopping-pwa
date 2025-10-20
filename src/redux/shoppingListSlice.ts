import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ShoppingListItem } from "../utils/types";
import { DAFAULT_SHOP_ID } from "../utils/constants";

type State = {
  items: ShoppingListItem[];
  shopId: string;
  // @TODO add shopId
};

const initialState: State = {
  items: [],
  shopId: DAFAULT_SHOP_ID,
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ShoppingListItem[]>) => {
      state.items = action.payload;
    },
    saveItem: (state, action: PayloadAction<ShoppingListItem>) => {
      if (!state.items.length) {
        state.items = [action.payload];
        return;
      }

      const idx = state.items?.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx < 0) {
        state.items = [...state.items, action.payload].sort(
          (a, b) => +b.isActive - +a.isActive
        );
        return;
      }
      state.items = [
        ...state.items.slice(0, idx),
        action.payload,
        ...state.items.slice(idx + 1),
      ].sort((a, b) => +b.isActive - +a.isActive);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const idx = state.items?.findIndex((item) => item.id === action.payload);
      state.items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1),
      ];
    },
    setShopId: (state, action: PayloadAction<string>) => {
      state.shopId = action.payload;
    },
  },
});

export const { setItems, saveItem, removeItem, setShopId } =
  shoppingListSlice.actions;

export default shoppingListSlice.reducer;
