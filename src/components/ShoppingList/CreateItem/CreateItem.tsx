import { useState } from "react";

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
    <div>
      <input
        placeholder="Enter new item"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};
