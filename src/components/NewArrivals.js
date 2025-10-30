import React, { useContext, useRef, useState, useEffect } from "react";
import { ProductContext } from "./../contexts/ProductsContext";
import "./NewArrival.css";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const { allBooks, eBooks } = useContext(ProductContext);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Combine and get latest books (assuming newer books have later dates or IDs)
  const newArrivals = [...allBooks, ...eBooks]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    )
    .slice(0, 12); // Show latest 12 books

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [newArrivals]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    checkScrollPosition();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    checkScrollPosition();
  };

  // Scroll button handlers
  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Format price with discount calculation
  const formatPrice = (price, originalPrice) => {
    if (!price) return "₹ N/A";

    const formattedPrice = `₹ ${price}`;

    if (originalPrice && originalPrice > price) {
      const discount = Math.round(
        ((originalPrice - price) / originalPrice) * 100
      );
      return (
        <div className="price-container">
          <span className="current-price">¥ {price}</span>
          <span className="original-price">¥ {originalPrice}</span>
          <span className="discount">{discount}%</span>
        </div>
      );
    }

    return <span className="current-price-only">{formattedPrice}</span>;
  };

  // Truncate long titles
  const truncateTitle = (title, maxLength = 20) => {
    if (!title) return "Untitled";
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const handleAddToBag = (book) => {
    // Add your add to cart logic here
    console.log("Added to bag:", book);
    // You can integrate with your cart context here
  };

  const handleViewAll = () => {
    // Navigate to all new arrivals page
    window.location.href = "/new-arrivals";
  };

  return (
    <section className="new-arrivals-section rufina1">
      <div className="section-header">
        <h2 className="section-title">New Arrivals</h2>
        {/* <button className="view-all-btn" onClick={handleViewAll}>
          VIEW ALL ▶
        </button> */}
      </div>

      <div className="scroll-container-wrapper">
        {/* Left Scroll Arrow */}
        {showLeftArrow && (
          <button
            className="scroll-arrow left-arrow"
            onClick={scrollLeftHandler}
          >
            ‹
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="books-scroll-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          onScroll={checkScrollPosition}
        >
          {newArrivals.map((book) => (
            <Link to={`/productDetails/${book._id}`}>
              <div key={book._id || book.id} className="book-card">
                <div className="book-image-container">
                  <img
                    src={
                      book.image || book.coverImage || "/default-book-cover.jpg"
                    }
                    alt={book.title || book.name}
                    className="book-image"
                  />
                </div>

                <div className="book-info">
                  <h3 className="book-title">
                    {truncateTitle(book.title || book.name)}
                  </h3>
                  {/* <p className="book-author">{book.author || "Unknown Author"}</p> */}

                  <div className="book-pricing">
                    {formatPrice(book.price, book.originalPrice)}
                  </div>

                  {/* <button
                  className="add-to-bag-btn"
                  onClick={() => handleAddToBag(book)}
                >
                  ADD TO BAG
                </button> */}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Scroll Arrow */}
        {showRightArrow && (
          <button
            className="scroll-arrow right-arrow"
            onClick={scrollRightHandler}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
