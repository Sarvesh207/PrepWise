import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { ToastContainer } from "react-toastify";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}

        <div className="flex flex-1">
          <AppSidebar />

          <div className="flex-1 flex flex-col">
            <div className="p-2 border-b">
              <SidebarTrigger />
            </div>

            <div className="flex-1 p-4">
              <Outlet />
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
