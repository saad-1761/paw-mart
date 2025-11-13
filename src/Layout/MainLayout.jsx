import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import DynamicTitle from "../Components/DynamincTitle";

const MainLayout = () => {
  return (
    <>
      <DynamicTitle></DynamicTitle>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
