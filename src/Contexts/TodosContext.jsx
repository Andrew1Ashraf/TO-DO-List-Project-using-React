import { createContext, useReducer } from "react";
import todoReducer from "../Reducers/todoReducer.js";

// eslint-disable-next-line react-refresh/only-export-components
export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
