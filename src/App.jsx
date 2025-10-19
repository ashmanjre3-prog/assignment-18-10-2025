import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ContactDetailsCard from "./Components/ContactDetailsCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:id" element={<ContactDetailsCard />} />
      </Routes>
    </>
  );
}

export default App;
