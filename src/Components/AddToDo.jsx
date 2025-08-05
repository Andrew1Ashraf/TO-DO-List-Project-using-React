import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { inputStyle } from "../Styles";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddToDo = ({
  onClick,
  onChange,
  onChangeDetails,
  todoTitle,
  todoDetails,
}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "20px",
      }}
    >
      <Grid sx={{ display: "flex" }} size={4}>
        <Button
          disabled={todoTitle.length === 0 || todoDetails.length === 0}
          onClick={onClick}
          sx={{
            width: "100%",
            fontSize: "25px",
            gap: "15px",
            height: "90%",
          }}
          variant="contained"
        >
          Add To-Do {<AddCircleOutlineIcon fontSize="large" />}
        </Button>
      </Grid>

      <Grid size={8}>
        <input
          placeholder="To-Do Title"
          variant="outlined"
          value={todoTitle}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          value={todoDetails}
          onChange={onChangeDetails}
          style={inputStyle}
          placeholder="To-Do Details"
        />
      </Grid>
    </Grid>
  );
};

export default AddToDo;
