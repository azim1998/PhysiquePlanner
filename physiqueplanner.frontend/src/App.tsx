import React from "react";
import logo from "./Assets/weightlifting_icon.png";
import "./App.css";
import Card from "./Components/Card/Card";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
