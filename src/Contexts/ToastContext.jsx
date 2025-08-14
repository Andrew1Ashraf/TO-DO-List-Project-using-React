import { useState } from "react";
import React from "react";
import SnackbarToast from "../Components/Toast";

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  function handleToast(message, color) {
    setColor(color);
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ handleToast }}>
      <SnackbarToast open={open} message={message} color={color} />
      {children}
    </ToastContext.Provider>
  );
};
export default ToastProvider;
