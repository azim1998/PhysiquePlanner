import React from 'react';
import logo from './Assets/weightlifting_icon.png'
import './App.css';
import Card from './Components/Card/Card';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Navbar/>
      <Outlet />
      <ToastContainer/>
    </>
  );
}

export default App;
