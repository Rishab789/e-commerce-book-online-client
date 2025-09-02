import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBooksExpanded, setIsBooksExpanded] = useState(false);
  const [isEBooksExpanded, setIsEBooksExpanded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth < 700) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
        // Close mobile menu when switching to desktop
        setIsMenuOpen(false);
        setIsBooksExpanded(false);
        setIsEBooksExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset expanded states when closing menu
    if (isMenuOpen) {
      setIsBooksExpanded(false);
      setIsEBooksExpanded(false);
    }
  };

  const toggleBooks = () => {
    setIsBooksExpanded(!isBooksExpanded);
  };

  const toggleEBooks = () => {
    setIsEBooksExpanded(!isEBooksExpanded);
  };

  const handleLinkClick = () => {
    // Close mobile menu when navigating
    setIsMenuOpen(false);
    setIsBooksExpanded(false);
    setIsEBooksExpanded(false);
  };

  return (
    <section>
      {isDesktop ? (
        <>
          <div className="main-menu-area sticky sticky-header-1 z-10">
            <div className="menu-area">
              <nav>
                <ul className="text-white flex justify-center gap-16">
                  <li>
                    <Link to="/">HOME</Link>
                  </li>
                  <li>
                    <a href="#">
                      BOOKS
                      <i className="bi bi-chevron-down font-extrabold"></i>
                    </a>

                    {/* Dropdown menu */}
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
          {/* Mobile Header */}
          <div className="relative">
            {/* Mobile Menu Bar */}
            <div className="bg-black shadow-lg">
              <div className="flex justify-between items-center h-14 px-5">
                <p className="text-white font-semibold text-lg tracking-wide">
                  MENU
                </p>
                <button
                  onClick={toggleMenu}
                  className="text-white text-3xl transition-transform duration-300 hover:scale-110 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <i className="bi bi-x-lg transform rotate-0 transition-transform duration-300"></i>
                  ) : (
                    <i className="bi bi-list"></i>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu with Beautiful Animation */}
            <div
              className={`absolute top-full left-0 right-0 bg-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${
                isMenuOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-4 invisible"
              }`}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white">
                {/* Home Link */}
                <div className="border-b border-gray-100">
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="flex items-center px-6 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-600 transition-all duration-300 font-medium"
                  >
                    <i className="bi bi-house-door mr-3 text-lg"></i>
                    HOME
                  </Link>
                </div>

                {/* Books Section */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={toggleBooks}
                    className="w-full flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 font-medium"
                  >
                    <div className="flex items-center">
                      <i className="bi bi-book mr-3 text-lg"></i>
                      BOOKS
                    </div>
                    <i
                      className={`bi ${
                        isBooksExpanded ? "bi-chevron-up" : "bi-chevron-down"
                      } transition-transform duration-300 ${
                        isBooksExpanded ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {/* Books Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isBooksExpanded
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-gray-25 to-blue-25 px-4 pb-2">
                      {/* Comics Category */}
                      <div className="mb-4">
                        <h3 className="text-emerald-600 font-bold text-sm uppercase tracking-wide px-4 py-2 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg mb-2">
                          Comics
                        </h3>
                        <div className="ml-4 space-y-1">
                          <Link
                            to="/category?category=fiction"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Fiction
                          </Link>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 1
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 2
                          </a>
                        </div>
                      </div>

                      {/* Marvel Category */}
                      <div className="mb-4">
                        <h3 className="text-red-600 font-bold text-sm uppercase tracking-wide px-4 py-2 border-l-4 border-red-500 bg-red-50 rounded-r-lg mb-2">
                          Marvel
                        </h3>
                        <div className="ml-4 space-y-1">
                          <Link
                            to="/category?category=nonfiction"
                            onClick={handleLinkClick}
                            className="block px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Non Fiction
                          </Link>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 1
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 2
                          </a>
                        </div>
                      </div>

                      {/* Super Hero Category */}
                      <div className="mb-4">
                        <h3 className="text-purple-600 font-bold text-sm uppercase tracking-wide px-4 py-2 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg mb-2">
                          Super Hero
                        </h3>
                        <div className="ml-4 space-y-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 1
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 2
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 3
                          </a>
                        </div>
                      </div>

                      {/* Adventure Category */}
                      <div className="mb-2">
                        <h3 className="text-orange-600 font-bold text-sm uppercase tracking-wide px-4 py-2 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg mb-2">
                          Adventure
                        </h3>
                        <div className="ml-4 space-y-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 1
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 2
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm"
                          >
                            Title 3
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* E-Books Section */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={toggleEBooks}
                    className="w-full flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300 font-medium"
                  >
                    <div className="flex items-center">
                      <i className="bi bi-tablet mr-3 text-lg"></i>
                      E-BOOKS
                    </div>
                    <i
                      className={`bi ${
                        isEBooksExpanded ? "bi-chevron-up" : "bi-chevron-down"
                      } transition-transform duration-300 ${
                        isEBooksExpanded ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {/* E-Books Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isEBooksExpanded
                        ? "max-h-48 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gradient-to-br from-purple-25 to-pink-25 px-4 pb-2">
                      <div className="ml-4 space-y-1 pt-2">
                        <Link
                          to="/ebook"
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-sm"
                        >
                          All E-Books
                        </Link>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-sm"
                        >
                          Digital Comics
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 text-sm"
                        >
                          Audio Books
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Link */}
                <div className="border-b border-gray-100">
                  <Link
                    to="/blogs"
                    onClick={handleLinkClick}
                    className="flex items-center px-6 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-600 transition-all duration-300 font-medium"
                  >
                    <i className="bi bi-journal-text mr-3 text-lg"></i>
                    BLOG
                  </Link>
                </div>

                {/* Contact/Support Section */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4">
                  <div className="flex items-center justify-center space-x-6">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      <i className="bi bi-telephone text-xl"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      <i className="bi bi-envelope text-xl"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      <i className="bi bi-question-circle text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                onClick={toggleMenu}
              ></div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        /* Additional styles for smooth animations */
        .bi-chevron-up,
        .bi-chevron-down {
          transition: transform 0.3s ease;
        }

        /* Custom scrollbar for mobile menu */
        .mobile-menu-content::-webkit-scrollbar {
          width: 4px;
        }

        .mobile-menu-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .mobile-menu-content::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }

        .mobile-menu-content::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }

        /* Smooth gradient backgrounds */
        .gray-25 {
          background-color: #fafafb;
        }
        .blue-25 {
          background-color: #f8faff;
        }
        .purple-25 {
          background-color: #faf9ff;
        }
        .pink-25 {
          background-color: #fef7f7;
        }

        /* Icon hover effects */
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default Header;
