import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FE7743",
    },
    secondary: {
      main: "#447D9B",
    },
    background: {
      main: "#273F4F",
    },
    Todos: {
      main: "#757575ff",
    },
  },
});

export const todoCardStyle = {
  minWidth: 275,
  backgroundColor: theme.palette.Todos.main,
  marginBlock: "20px",
  transition: "all 0.5s",
  ":hover": {
    paddingBlock: "20px",
    backgroundColor: theme.palette.primary.main,
  },
};

export const filterbuttonStyle = {
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  fontSize: "20px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: "none",
  },
};

export const todosBtnStyles = {
  delete: {
    ":hover": {
      color: "white",
      backgroundColor: "#ff0000ff",
    },
    color: "#ff0000ff",
    backgroundColor: "white",

    transition: "all 0.5s",
  },
  completed: {
    ":hover": {
      color: "white",
      backgroundColor: "#8bc34a",
    },
    color: "#8bc34a",
    backgroundColor: "white",

    transition: "all 0.5s",
  },
  edit: {
    ":hover": {
      color: "white",
      backgroundColor: "#0062ffff",
    },
    color: "#0062ffff",
    backgroundColor: "white",

    transition: "all 0.5s",
  },
};

export const inputStyle = {
  width: "90%",
  marginBottom: "10px",
  color: theme.palette.primary.main,
  border: "none",
  padding: "20px",
  borderRadius: "10px",
  fontSize: "16px",
};
