import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";
import {LenisScroll} from "../components";
import { ToastContainer } from "react-toastify";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LenisScroll />
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />

      <ToastContainer />
    </div>
  );
}

export default PublicLayout;
