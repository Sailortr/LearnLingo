import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
