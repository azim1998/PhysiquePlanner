import React from "react";
import Card from "../../Components/Card/Card";
import logo from "../../Assets/weightlifting_icon.png";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
      <div>
        <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-500 text-transparent bg-clip-text mx-auto pb-3">
          Physique Planner
        </h1>
        <img className="w-2/6 mx-auto h-full" src={logo} alt="logo" />
        <p className="text-center text-2xl pt-2">Transform your body with your tailor made program</p>
      </div>
    </>
  );
};

export default HomePage;
