import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Counter from "./screens/Counter";
import Main from "./screens/Main";

function App() {
  return (
    //<Main />
    <BrowserRouter>
      <PublicRoute />
      <NavBar />
    </BrowserRouter>
  );
}

const NavBar = () => {
  const navigate = useNavigate();

  const onClick = (path: string) => {
    return navigate(path);
  };

  return (
    <div>
      <button onClick={() => onClick("/")}>Main</button>
      <button onClick={() => onClick("/counter")}>Counter</button>
    </div>
  );
};

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default App;
