import React from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import SearchLogoCart from "./components/SearchLogoCart";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { LoginConextProvider } from "./contexts/LogInContext";

const App = () => {
  return (
    <div className="">
      {/* <LoginConextProvider> */}
      <TopBar />
      <SearchLogoCart />
      <Header />
      <Outlet />
      <Footer />
      {/* </LoginConextProvider> */}
    </div>
  );
};

export default App;
