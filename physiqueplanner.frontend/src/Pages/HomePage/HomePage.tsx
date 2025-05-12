import React from 'react'
import Card from '../../Components/Card/Card';
import logo from '../../Assets/weightlifting_icon.png'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ borderRadius: 8, width: "25%", paddingTop: 20 }}
        />
        <h1 style={{ textAlign: "center" }}>Physique Planner</h1>
      </div>
    </>
  );
}

export default HomePage