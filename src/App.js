import React from "react";
import "./App.css";
import { TaskManager } from "./components/TaskManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <TaskManager />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
