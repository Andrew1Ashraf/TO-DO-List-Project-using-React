import { v4 as uuidv4 } from "uuid";
export default function todoReducer(curentTodo, action) {
  switch (action.type) {
    case "Add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: action.payload.details,
        isCompleted: false,
      };
      const addedTodo = [...curentTodo, newTodo];
      localStorage.setItem("todos", JSON.stringify(addedTodo));
      return addedTodo;
    }

    case "Delete": {
      const deletedTodo = curentTodo.filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(deletedTodo));
      return deletedTodo;
    }

    case "Update": {
      const updatedTodos = curentTodo.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, ...action.payload.updatedTodo };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "Completed": {
      const updatedTodos = curentTodo.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "getTodos": {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        return JSON.parse(storedTodos);
      } else {
        return [];
      }
    }

    default:
      return curentTodo;
  }
}
