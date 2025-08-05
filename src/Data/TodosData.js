import { v4 as uuidv4 } from "uuid";

export const initialTodos = [
  {
    id: uuidv4(),
    title: "To-Do 1",
    details: "To-Do 1 details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "To-Do 2",
    details: "To-Do 2 details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "To-Do 3",
    details: "To-Do 3 details",
    isCompleted: false,
  },
];
