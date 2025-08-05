import { Card, CardContent, Grid, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { todosBtnStyles, todoCardStyle } from "../Styles";
import { useState } from "react";
import DeleteTodo from "./DeleteTodo";
import UpdateTodos from "./UpdateTodos";

const Todos = ({ todo, onDeleteConfirm, onCompletedClick }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);

  return (
    <>
      <DeleteTodo
        open={openDelete}
        onClose={handleDeleteClose}
        onConfirm={() => onDeleteConfirm(todo.id)}
      />

      <UpdateTodos open={openUpdate} Close={handleUpdateClose} todo={todo} />

      <Card sx={todoCardStyle}>
        <CardContent>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              flexDirection: { xs: "column", sm: "row" }, // عمودي في الموبايل، صف في الديسك
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            {/* Buttons */}
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "space-evenly" },
                mb: { xs: 1, sm: 0 }, // مسافة تحت في الموبايل
              }}
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

            {/* Title & Details */}
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "black",
                  textDecoration: todo.isCompleted ? "line-through" : "",
                  overflowWrap: "break-word",
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: "black",
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
    </>
  );
};

export default Todos;
