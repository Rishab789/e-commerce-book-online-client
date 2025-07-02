import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LogInContext } from "./../contexts/LogInContext";
import { dashMenu } from "../services/dashboardMenu";
import logout_icon from "./../assets/dashboardAssets/out.png";
import AreYouSure from "../modals/AreYouSure";

const Dashborad = () => {
  const { auth, logout } = useContext(LogInContext);
  const [isLogOut, setIsLogOut] = useState(false);

  const logOuthandler = () => {
    setIsLogOut(true);
  };

  return (
    <main>
      <AreYouSure
        className={`absolute top-1/4 left-1/3 z-20 ${
          isLogOut ? "block" : "hidden"
        } `}
        setIsLogOut={setIsLogOut}
      />
      <div className={`flex ${isLogOut ? "blur-sm" : "blur-0"} `}>
        {/* left sec  */}
        <div className=" w-[20%]  ">
          <div className="w-[90%] px-5  min-h-screen m-auto bg-slate-200">
            <div className="flex items-center gap-5  m-auto mb-6">
              <img
                src="https://htmldemo.net/koparion/koparion/img/team/1.jpg"
                width={40}
              />
              <p>Rishab</p>
            </div>
            <div className=" m-auto ">
              {dashMenu.map((item, index) => (
                <div className="hover:bg-gray-300" key={index}>
                  <Link to={item.path} key={index}>
                    <div className="flex items-center gap-5 py-3">
                      <img src={item.image} width={30} />
                      <p>{item.text}</p>
                    </div>
                  </Link>
                </div>
              ))}
              <div
                className="flex items-center gap-5 py-3 cursor-pointer"
                onClick={logOuthandler}
              >
                <img src={logout_icon} width={30} />
                <p>Log out</p>
              </div>
            </div>
          </div>
        </div>
        {/* right sec  */}
        <div className=" w-[80%]  overflow-y-auto h-screen pb-14">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashborad;
