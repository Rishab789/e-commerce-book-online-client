import React, { useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import SearchLogoCart from "./components/SearchLogoCart";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { LoginConextProvider } from "./contexts/LogInContext";
import AreYouSure from "./modals/AreYouSure";

const App = () => {
  const [isLogOut, setIsLogOut] = useState(false);

  const logOuthandler = () => {
    setIsLogOut(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <AreYouSure
          className={`fixed top-1/4 left-4 md:left-1/3 lg:left-1/3 z-50 ${
            isLogOut ? "block" : "hidden"
          }`}
          setIsLogOut={setIsLogOut}
        />
      </div>

      <div className={`flex-1 ${isLogOut ? "blur-sm" : "blur-0"}`}>
        {/* Sticky Header Section */}
        <div className="md:sticky lg:sticky top-0 z-40 bg-white shadow-sm">
          <TopBar onLogoutClick={logOuthandler} />
          <SearchLogoCart />
          <Header />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
