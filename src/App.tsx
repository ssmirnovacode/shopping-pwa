import "./App.css";
import { Header } from "./components/Header";
import { ShoppingList } from "./components/ShoppingList/ShoppingList";
import { DAFAULT_SHOP_ID } from "./utils/constants";

//let scriptRan = false;

function App() {
  // useEffect(() => {
  //   if (scriptRan) return;

  //   LIST.forEach((item) => {
  //     setShoppingItem(item).then(() => console.log(item.name));
  //   });
  //   scriptRan = true;
  // }, []);
  return (
    <main className="wrapper">
      <Header />
      <ShoppingList shopId={DAFAULT_SHOP_ID} />
    </main>
  );
}

export default App;
