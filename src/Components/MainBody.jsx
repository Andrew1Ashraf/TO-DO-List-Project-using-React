import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { filterbuttonStyle, theme } from "../Styles";
import Todos from "./Todos";
import AddToDo from "./AddToDo";
import { TodosContext } from "../Contexts/TodosContext";
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MainBody = () => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* states */
  const [addTodoTitle, setaddTodoTitle] = useState("");
  const [addTodoDetails, setaddTodoDetails] = useState("");
  const [filterTodos, setFilterTodos] = useState("all");

  // mobile drawer state (UI only)
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Handlers */
  function handleAddTodo() {
    const newTodo = {
      id: uuidv4(),
      title: addTodoTitle,
      details: addTodoDetails,
      isCompleted: false,
    };

    const addedTodo = [...todos, newTodo];
    setTodos(addedTodo);
    localStorage.setItem("todos", JSON.stringify(addedTodo));
    setaddTodoTitle("");
    setaddTodoDetails("");
  }

  function handleDeleteTodo(id) {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodo);
    localStorage.setItem("todos", JSON.stringify(deletedTodo));
  }

  function handleCompletedTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUncompletedTodos() {
    const filteredTodos = todos.filter((todo) => {
      return !todo.isCompleted;
    });
    return filteredTodos;
  }
  function handleCompletedTodos() {
    const filteredTodos = todos.filter((todo) => {
      return todo.isCompleted;
    });
    return filteredTodos;
  }

  /* END Handlers */

  let todosToBeDisplayed = todos;

  if (filterTodos === "uncompleted") {
    todosToBeDisplayed = handleUncompletedTodos();
  } else if (filterTodos === "completed") {
    todosToBeDisplayed = handleCompletedTodos();
  }
  const todoList = todosToBeDisplayed.map((todo) => (
    <Todos
      key={todo.id}
      todo={todo}
      onDeleteConfirm={() => handleDeleteTodo(todo.id)}
      onCompletedClick={() => handleCompletedTodo(todo.id)}
    />
  ));

  // Buttons UI (reused for desktop and drawer)
  const filterButtons = (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <Button
        onClick={() => {
          setFilterTodos("uncompleted");
          setMobileOpen(false);
        }}
        sx={filterbuttonStyle}
      >
        Uncompleted-Tasks
      </Button>
      <Button
        onClick={() => {
          setFilterTodos("completed");
          setMobileOpen(false);
        }}
        sx={filterbuttonStyle}
      >
        Completed-Tasks
      </Button>
      <Button
        onClick={() => {
          setFilterTodos("all");
          setMobileOpen(false);
        }}
        sx={filterbuttonStyle}
      >
        All-Tasks
      </Button>
    </Stack>
  );

  return (
    <>
      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275 }}
          style={{ backgroundColor: theme.palette.background.main }}
        >
          <CardContent>
            <Typography
              variant="h2"
              component="div"
              color={theme.palette.primary.main}
            >
              My TO-DO`s
            </Typography>
            <hr />

            {/* Desktop view: show inline buttons */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                onClick={() => setFilterTodos("uncompleted")}
                sx={filterbuttonStyle}
              >
                Uncompleted-Tasks
              </Button>
              <Button
                onClick={() => setFilterTodos("completed")}
                sx={filterbuttonStyle}
              >
                Completed-Tasks
              </Button>
              <Button
                onClick={() => setFilterTodos("all")}
                sx={filterbuttonStyle}
              >
                All-Tasks
              </Button>
            </Box>

            {/* Mobile view: burger icon */}
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
                mt: 1,
              }}
            >
              <IconButton
                onClick={() => setMobileOpen(true)}
                aria-label="open filter menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Drawer for mobile */}
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
            >
              {filterButtons}
            </Drawer>

            {/* Filter Buttons End */}

            {/* All Todos */}
            {todoList}
            {/* All Todos End */}

            {/* Add To-Do */}
            <AddToDo
              onClick={handleAddTodo}
              onChange={(e) => setaddTodoTitle(e.target.value)}
              onChangeDetails={(e) => setaddTodoDetails(e.target.value)}
              todoTitle={addTodoTitle}
              todoDetails={addTodoDetails}
            />
            {/* Add To-Do End */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default MainBody;
