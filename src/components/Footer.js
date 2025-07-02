import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <section className="bg-[#222222]">
        <div className="pb-10 md:p-5 lg:p-8">
          <ul className="text-white  flex  flex-col  md:flex-row   gap-10 container ">
            <div className="flex flex-wrap justify-center gap-3 items-center m-auto md:m-0">
              <li className="">
                <a href="#" className="">
                  Home
                </a>
              </li>

              <li className="">
                <Link to="/contact" className="">
                  Contact Us
                </Link>
              </li>
              <li className="">
                <Link to="/about" className="">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="">
                  Blog
                </Link>
              </li>
            </div>
            <div className="flex gap-3  m-auto md:m-0">
              <li className="">
                <FaYoutube className="icon text-2xl md:text-3xl lg:text-4xl hover:bg-white hover:text-black hover:rounded-full duration-300 hover:px-1" />
              </li>
              <li className="">
                <FaXTwitter className="icon text-2xl md:text-3xl lg:text-4xl hover:bg-white hover:text-black hover:rounded-full duration-300 hover:px-1" />
              </li>
              <li className="">
                <FaFacebookSquare className="icon text-2xl md:text-3xl lg:text-4xl hover:bg-white hover:text-black hover:rounded-full duration-300 hover:px-1" />
              </li>
              <li className="">
                <FaInstagram className="icon text-2xl md:text-3xl  lg:text-4xl hover:bg-white hover:text-black hover:rounded-full duration-300 hover:px-1" />
              </li>
            </div>
          </ul>

          <div className="border-b-2 border-[#393939] w-[93%] m-auto mt-5"></div>
        </div>
        <div className="text-white flex  flex-col gap-5  text-center md:text-left md:grid md:grid-cols-4 container ">
          <div className="  ">
            <p>PRODUCTS</p>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Price drop</a>
              </li>
              <li>
                <a href="#">New Products</a>
              </li>
              <li>
                <a href="#">Best Sales</a>
              </li>
            </ul>
          </div>
          <div>
            <p>PRODUCTS</p>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Price drop</a>
              </li>
              <li>
                <a href="#">New Products</a>
              </li>
              <li>
                <a href="#">Best Sales</a>
              </li>
            </ul>
          </div>
          <div>
            <p>PRODUCTS</p>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Price drop</a>
              </li>
              <li>
                <a href="#">New Products</a>
              </li>
              <li>
                <a href="#">Best Sales</a>
              </li>
            </ul>
          </div>
          <div>
            <p>STORE INFORMATION</p>
            <p>My Company</p>
            <p>Your address goes here.</p>
            <p>Call us now: 0123456789</p>
            <p>Email: demo@example.com</p>
          </div>
        </div>
        <div className="border-b-2 border-[#393939] w-[90%] m-auto mt-10"></div>
        <div>
          <div className="text-white text-center p-8">
            <p>© 2024 Koparion Mede with ❤️ by Prakash Chandra Bera</p>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
