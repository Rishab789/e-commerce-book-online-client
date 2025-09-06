import React, { useContext, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BlogsContext } from "../contexts/blogs.context";

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const swipeThreshold = 50;

  const { blogs } = useContext(BlogsContext);

  // Calculate visible items based on screen size
  const getVisibleItems = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVisibleItems(getVisibleItems());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide every 5 seconds if not hovered
  useEffect(() => {
    if (isHovered || blogs.length <= visibleItems) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= blogs.length - visibleItems ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, blogs.length, visibleItems]);

  const nextSlide = () => {
    if (currentIndex >= blogs.length - visibleItems) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(blogs.length - visibleItems);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch and mouse swipe handlers
  const handleStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(x);
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging || startX === null) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = startX - x;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
    };
  };

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            LATEST FROM OUR BLOGS
          </h2>
          <p className="text-center text-gray-600">
            No blogs available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          LATEST FROM OUR BLOGS
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel container */}
          <div
            ref={containerRef}
            className="overflow-hidden"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
                width: `${(blogs.length / visibleItems) * 100}%`,
              }}
            >
              {blogs.map((blog, index) => {
                const { day, month } = formatDate(blog.createdAt || blog.date);

                return (
                  <div
                    key={blog._id}
                    className="px-3"
                    style={{ flex: `0 0 ${100 / visibleItems}%` }}
                  >
                    <Link to={`/blogs/${blog._id}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <div className="absolute top-4 left-4 z-10 bg-white rounded-md p-2 shadow-md flex flex-col items-center">
                            <span className="font-bold text-lg text-gray-800">
                              {day}
                            </span>
                            <span className="text-xs font-semibold text-primary-color">
                              {month}
                            </span>
                          </div>
                          <img
                            src={blog.cover}
                            alt={blog.title}
                            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                        </div>

                        <div className="p-5 flex-grow">
                          <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {blog.desc}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-auto">
                            <FaCalendarAlt className="mr-2" />
                            <span>
                              {blog.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString()
                                : "Recent"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation arrows */}
          {blogs.length > visibleItems && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-primary-color hover:text-white transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                } md:opacity-100`}
                aria-label="Previous blog"
              >
                <FaChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-primary-color hover:text-white transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                } md:opacity-100`}
                aria-label="Next blog"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}

          {/* Indicators */}
          {blogs.length > visibleItems && (
            <div className="flex justify-center mt-8">
              {Array.from({
                length: Math.ceil(blogs.length / visibleItems),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * visibleItems)}
                  className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                    currentIndex >= index * visibleItems &&
                    currentIndex < (index + 1) * visibleItems
                      ? "bg-primary-color w-8"
                      : "bg-gray-300 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            to="/blogs"
            className="inline-block bg-primary-color text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300 font-medium"
          >
            View All Blogs
          </Link>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;
