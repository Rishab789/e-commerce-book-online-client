import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMenuClicked, setIsMenuClicked] = useState(true);
  const [isPlus, setIsPlus] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    if (innerWidth < 700) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  });

  return (
    <section>
      {isDesktop ? (
        <>
          <div className="main-menu-area sticky sticky-header-1  z-10">
            <div className="menu-area">
              <nav>
                <ul className="text-white flex justify-center gap-16 ">
                  <li className="">
                    <Link to="/" className="">
                      HOME
                    </Link>
                  </li>
                  <li className=" ">
                    {/* <div className="flex items-center gap-2 "> */}
                    <a href="#">
                      BOOKS
                      <i className="bi bi-chevron-down font-extrabold"></i>{" "}
                    </a>

                    {/* </div> */}

                    {/* Dropdown menu  */}
                    <div className="mega-menu">
                      <span>
                        <p className="category-title">Comics</p>
                        <Link to="/category?category=fiction">Fiction</Link>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                      <span>
                        <p className="category-title">Marvel</p>
                        <Link to="/category?category=nonfiction">
                          Non Fiction
                        </Link>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                      <span>
                        <p className="category-title">Super Hero</p>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                      <span>
                        <p className="category-title">Adventure</p>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-1 items-center cursor-pointer">
                    <Link to="/ebook">e-BOOKS</Link>
                  </li>
                  <li>
                    <a href="/blogs">BLOG</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="bg-black">
              <div className=" flex justify-between items-center h-12 pl-5 pr-5">
                <p className="text-white">MENU</p>
                {isMenuClicked ? (
                  <i
                    className="bi bi-list text-white text-3xl"
                    onClick={() => setIsMenuClicked(!isMenuClicked)}
                  ></i>
                ) : (
                  <i
                    className="bi bi-x-lg text-white text-3xl"
                    onClick={() => setIsMenuClicked(!isMenuClicked)}
                  ></i>
                )}
              </div>

              <div className={isMenuClicked ? "hidden" : "block"}>
                <div className="bg-slate-200  flex flex-col  box">
                  <div>
                    <p>HOME</p>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    onClick={() => setIsPlus(!isPlus)}
                  >
                    <p>BOOKS</p>
                    {isPlus ? "➕" : "➖"}
                  </div>
                  <div className={isPlus ? "hidden" : "block"}>
                    <div className="mega-menu flex flex-col">
                      <span className="flex flex-col">
                        <a href="#">Comics</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                      <span className="flex flex-col">
                        <a href="#">Marvel</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                      <span className="flex flex-col">
                        <a href="#">Super Hero</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                      <span className="flex flex-col">
                        <a href="#">Adventure</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                        <a href="#">title 1</a>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>E-BOOKS</p>
                    {isPlus ? "➕" : "➖"}
                  </div>
                  <div>
                    <p>BLOGS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Header;
