import React, { useState, useEffect } from "react";
import "./DiscountStrip.css";

const DiscountStrip = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  // Array of discount offers
  const offers = [
    {
      id: 1,
      text: "🎉 Special Offer! Get 25% OFF on all fiction books. Use code: FICTION25",
      highlight: "25% OFF",
    },
    {
      id: 2,
      text: "🚚 Free Shipping on orders above ₹499! Limited time offer.",
      highlight: "Free Shipping",
    },
    {
      id: 3,
      text: "📚 Buy 2 Get 1 Free on all bestsellers. Hurry while stocks last!",
      highlight: "Buy 2 Get 1 Free",
    },
    {
      id: 4,
      text: "⭐ New Customer Discount! Get 30% OFF on your first order. Use code: WELCOME30",
      highlight: "30% OFF",
    },
  ];

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000); // Change offer every 4 seconds

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="discount-strip">
      <div className="strip-content">
        {/* Animated scrolling text */}
        <div className="scrolling-offers">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`offer-text ${index === currentOffer ? "active" : ""}`}
            >
              <span className="offer-content">
                {offer.text.split(offer.highlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="highlight-text">{offer.highlight}</span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="offer-indicators">
          {offers.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentOffer ? "active" : ""}`}
              onClick={() => setCurrentOffer(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountStrip;
