import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./Components/UsersList";
import UserFormComponent from "./Components/UserForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={UsersList} />
        <Route exact path="/form" Component={UserFormComponent} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
