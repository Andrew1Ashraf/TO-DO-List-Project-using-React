import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog } from "@mui/material";
import { TodosContext } from "../Contexts/TodosContext";
import { ToastContext } from "../Contexts/ToastContext";

const UpdateTodos = ({ open, Close, todo }) => {
  const { dispatch } = useContext(TodosContext);
  const { handleToast } = useContext(ToastContext);
  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const handleUpdateTodo = (id, updatedTodo) => {
    dispatch({ type: "Update", payload: { id, updatedTodo } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(todo.id, editTodo);
    Close;
    handleToast("Todo Edited ✏ ✔", "primary");
  };

  return (
    <Dialog open={open} onClose={Close}>
      <DialogTitle>Edit To-Do</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText></DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Title"
            label="Edit To-Do Title"
            fullWidth
            variant="standard"
            value={editTodo.title}
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            label="Edit To-Do Details"
            fullWidth
            variant="standard"
            value={editTodo.details}
            onChange={(e) =>
              setEditTodo({ ...editTodo, details: e.target.value })
            }
          />
          <DialogActions>
            <Button onClick={Close}>Cancel</Button>
            <Button type="submit" onClick={Close}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodos;
