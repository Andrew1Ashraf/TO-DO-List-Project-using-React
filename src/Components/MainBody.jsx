import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { filterbuttonStyle, theme } from "../Styles";
import Todos from "./Todos";
import AddToDo from "./AddToDo";
import { TodosContext } from "../Contexts/TodosContext";
import { useState, useContext, useEffect, useMemo } from "react";
import { Box, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContext } from "../Contexts/ToastContext.jsx";

const MainBody = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const { handleToast } = useContext(ToastContext);

  useEffect(() => {
    dispatch({ type: "getTodos" });
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
    dispatch({
      type: "Add",
      payload: { title: addTodoTitle, details: addTodoDetails },
    });
    setaddTodoTitle("");
    setaddTodoDetails("");
    handleToast("Todo Added successfully", "success");
  }

  function handleDeleteTodo(id) {
    dispatch({ type: "Delete", payload: { id } });
    handleToast("Todo Deleted successfully", "danger");
  }

  function handleCompletedTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo.isCompleted) {
      handleToast("Todo Set as Completed ✔", "success");
    } else {
      handleToast("Todo Set as Uncompleted", "warning");
    }

    dispatch({ type: "Completed", payload: { id } });
  }

  const showUnCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isCompleted;
    });
  }, [todos]);

  const showCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);

  /* END Handlers */

  let todosToBeDisplayed = todos;

  if (filterTodos === "uncompleted") {
    todosToBeDisplayed = showUnCompletedTodos;
  } else if (filterTodos === "completed") {
    todosToBeDisplayed = showCompletedTodos;
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
      <Container maxWidth="false" style={{ height: "100%", width: "80%" }}>
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
