import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Top Section - Navigation & Social */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 pb-8 border-b border-gray-700">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center lg:justify-start gap-8 mb-6 lg:mb-0">
            <Link
              to="/"
              className="hover:text-orange-400 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-400 transition-colors duration-300 font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="hover:text-orange-400 transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/blogs"
              className="hover:text-orange-400 transition-colors duration-300 font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <Link
              to="https://www.facebook.com/profile.php?id=61577919128813"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                <FaFacebookSquare className="text-xl group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>

            <Link
              to="https://www.instagram.com/novelez_pb/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                <FaInstagram className="text-xl group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>

            {/* Uncomment these when ready to use */}
            {/* <Link to="#" className="group">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                <FaXTwitter className="text-xl group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>
            
            <Link to="#" className="group">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                <FaYoutube className="text-xl group-hover:text-white transition-colors duration-300" />
              </div>
            </Link> */}
          </div>
        </div>

        {/* Footer Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-400 mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Latest Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  New Products
                </Link>
              </li>
              <li>
                <Link
                  to="/bestsellers"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-400 mb-4 uppercase tracking-wide">
              Customer Care
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/support"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-400 mb-4 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/dmca"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                >
                  DMCA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-orange-400 mb-4 uppercase tracking-wide">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-orange-400 flex-shrink-0" />
                <span className="text-sm">Your address goes here</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-orange-400 flex-shrink-0" />
                <a
                  href="tel:0123456789"
                  className="text-sm hover:text-orange-400 transition-colors duration-300"
                >
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-orange-400 flex-shrink-0" />
                <a
                  href="mailto:demo@example.com"
                  className="text-sm hover:text-orange-400 transition-colors duration-300"
                >
                  hello@novelez.com
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-200">
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 text-white focus:text-white px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start">
                © {currentYear} Novelez. Made with
                <FaHeart className="text-red-500 mx-1 animate-pulse" />
                by Prakash Chandra Bera
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex space-x-6 text-sm">
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                Sitemap
              </Link>
              <Link
                to="/accessibility"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                Accessibility
              </Link>
              <Link
                to="/careers"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>DRM Free</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
