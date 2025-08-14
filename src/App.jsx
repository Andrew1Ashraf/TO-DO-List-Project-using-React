import "./App.css";
import MainBody from "./Components/MainBody";

import ToastProvider from "./Contexts/ToastContext";
import TodosProvider from "./Contexts/TodosContext";

function App() {
  return (
    <ToastProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <TodosProvider>
          <MainBody />
        </TodosProvider>
      </div>
    </ToastProvider>
  );
}

export default App;
