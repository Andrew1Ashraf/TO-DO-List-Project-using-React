import * as React from "react";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import { keyframes } from "@mui/system";

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

export default function SnackbarToast({ open, message, color }) {
  const animationDuration = 1000;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        color={color}
        size="md"
        variant="solid"
        open={open}
        animationDuration={animationDuration}
        sx={[
          open && {
            animation: `${inAnimation} ${animationDuration}ms forwards`,
          },
          !open && {
            animation: `${outAnimation} ${animationDuration}ms forwards`,
          },
        ]}
      >
        {message}
      </Snackbar>
    </div>
  );
}
