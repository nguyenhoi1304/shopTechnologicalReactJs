import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LiveChat from "../components/LiveChat/LiveChat";

const RootLayout = () => {
  return (
    <>
      <div style={{ maxWidth: "60%", margin: "0 auto" }}>
        <MainNavigation />
        <main>
          <Outlet />
          <LiveChat />
        </main>
      </div>
      <div
        style={{
          backgroundColor: "#000",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
