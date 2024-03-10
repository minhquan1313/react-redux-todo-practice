// import "./App.css";
import Todo from "@/Pages/Todo";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
    </Routes>
  );
}

export default App;
