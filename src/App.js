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
    <div>
      <div>
        <AreYouSure
          className={`absolute top-1/4 left-16 md:left-1/3 lg:left-1/3 z-20 ${
            isLogOut ? "block" : "hidden"
          } `}
          setIsLogOut={setIsLogOut}
        />
      </div>

      <div className={`${isLogOut ? "blur-sm" : "blur-0"}`}>
        <TopBar onLogoutClick={logOuthandler} />
        <SearchLogoCart />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default App;
