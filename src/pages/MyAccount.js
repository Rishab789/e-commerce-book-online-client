import React from "react";
import { Link, Outlet } from "react-router-dom";

const MyAccount = () => {
  const menu = [
    {
      title: "Orders",
      icon: "fa-solid fa-cart-shopping",
      path: "orders",
    },
    {
      title: "Payment Method",
      icon: "fa-regular fa-credit-card",
      path: "payment",
    },
    {
      title: "Address",
      icon: "fa-solid fa-location-dot",
      path: "address",
    },
    {
      title: "Account Details",
      icon: "fa-solid fa-user",
      path: "accountdetails",
    },
    {
      title: "Logout",
      icon: "fa-solid fa-right-from-bracket",
      path: "/signin",
    },
  ];

  return (
    <div className="">
      <div className=" px-1 md:px-12 lg:px-14">
        <p className="text-3xl border-b-2 pt-5">My-Account</p>
        {/* Main Container  */}
        <div className="flex flex-col md:flex-row lg:flex-row gap-10 mt-40 mb-36">
          {/* Left Container  */}
          <div className=" md:w-1/4 lg:w-1/4 ">
            <ul className="border flex flex-col ">
              {menu.map((item, index) => (
                <Link to={item.path}>
                  <li
                    key={index}
                    className="flex items-center gap-3 border-b-[1px] pl-5 border-gray-300 hover:bg-secondary-color duration-200 hover:text-white  py-3"
                  >
                    <i className={item.icon}></i>
                    <p>{item.title}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* right Container  */}
          <div className="md:w-3/4 lg:w-3/4 border md:px-10  px-2 lg:px-10 py-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
