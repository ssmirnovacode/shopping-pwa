import { useState } from "react";
import "./CreateItem.scss";

type Props = {
  onCreate: (id: string, text: string) => void;
};
export const CreateItem = ({ onCreate }: Props) => {
  const [text, setText] = useState("");

  //@TODO amplify form to set the price

  const handleCreate = () => {
    const id = Date.now().toString();
    onCreate(id, text);
    setText("");
  };
  return (
    <div className="createItem">
      <input
        placeholder="Enter new item"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleCreate} disabled={!text}>
        Create
      </button>
    </div>
  );
};
