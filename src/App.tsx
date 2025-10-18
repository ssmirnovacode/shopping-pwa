import { useState } from "react";

import "./App.css";
import { Header } from "./components/Header";
import { ShoppingList } from "./components/ShoppingList/ShoppingList";
import { DAFAULT_SHOP_ID } from "./utils/constants";

function App() {
  return (
    <main className="wrapper">
      <Header />
      <ShoppingList shopId={DAFAULT_SHOP_ID} />
    </main>
  );
}

export default App;
