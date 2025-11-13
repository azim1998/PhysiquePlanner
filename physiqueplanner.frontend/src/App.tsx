import React from "react";
import logo from "./Assets/weightlifting_icon.png";
import "./App.css";
import Card from "./Components/Card/Card";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider>
        <AuthProvider>
          <Navbar />
          <div className="mx-auto pt-4 sm:max-w-[700px] md:max-w-[1000px]">
          <Outlet />
          </div>
          <ToastContainer />
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default App;
