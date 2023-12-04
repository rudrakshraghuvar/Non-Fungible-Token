import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Read from "./components/Read";
import Write from "./components/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/read" element={<Read />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;