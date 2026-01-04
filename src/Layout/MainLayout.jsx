import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import DynamicTitle from "../Components/DynamincTitle";
import { Scroll } from "lucide-react";
import ScrollToTop from "../Components/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <DynamicTitle></DynamicTitle>
      <ScrollToTop />
      <div className="w-full">
        <Navbar></Navbar>
      </div>

      <div className="pt-21 min-h-[calc(100vh-68px)]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;
