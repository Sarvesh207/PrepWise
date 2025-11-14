import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";
import LenisScroll from "./lenis-scroll";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <div className="min-h-screen  flex flex-col">
      <LenisScroll />
      <Navbar />
      <ToastContainer />

      <div className="max-[1440px]:">
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
