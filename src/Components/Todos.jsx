import { Card, CardContent, Dialog, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { todosBtnStyles, todoCardStyle } from "../Styles";
import { useState } from "react";
import DeleteTodo from "./DeleteTodo";
import UpdateTodos from "./UpdateTodos";

const Todos = ({ todo, onDeleteConfirm, onCompletedClick }) => {
  {
    /* STATES */
  }

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  {
    /* End STATES */
  }

  {
    /* Handlers */
  }

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  {
    /* End Handlers */
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <DeleteTodo
        open={openDelete}
        onClose={handleDeleteClose}
        onConfirm={() => onDeleteConfirm(todo.id)}
      />

      <UpdateTodos open={openUpdate} Close={handleUpdateClose} todo={todo} />

      <Card sx={todoCardStyle}>
        <CardContent>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid
              sx={{ display: "flex", justifyContent: "space-evenly" }}
              size={4}
            >
              <IconButton
                onClick={handleDeleteOpen}
                aria-label="delete"
                sx={todosBtnStyles.delete}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateOpen}
                aria-label="edit"
                sx={todosBtnStyles.edit}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>

              <IconButton
                onClick={onCompletedClick}
                aria-label="Check"
                sx={todosBtnStyles.completed}
                style={{
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "",
                  color: todo.isCompleted ? "white" : "",
                }}
              >
                <CheckIcon />
              </IconButton>
            </Grid>

            <Grid size={8}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "black",
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "",
                  overflowWrap: "break-word",
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                variant="p"
                component="div"
                sx={{
                  color: "black",
                  textAlign: "right",
                  fontSize: "18px",
                  textDecoration: todo.isCompleted ? "line-through" : "",
                  overflowWrap: "break-word",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Todos;
