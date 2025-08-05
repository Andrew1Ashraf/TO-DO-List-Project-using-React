import "./App.css";
import MainBody from "./Components/MainBody";
import { TodosContext } from "./Contexts/TodosContext";
import { useState } from "react";
import { initialTodos } from "./Data/TodosData";


function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <MainBody />
      </div>
    </TodosContext.Provider>
  );
}

export default App;
