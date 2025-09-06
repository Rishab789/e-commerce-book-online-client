import React, { useState } from "react";
import Button from "./../components/Button";
import { Link } from "react-router-dom";

const EBookProducts = ({ product }) => {
  const {
    imageFile,
    price,
    title,
    _id,
    originalPrice,
    discount,
    rating,
    author,
    description,
  } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Calculate discount percentage
  const discountPercentage =
    originalPrice && price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // Fallback for originalPrice if not provided
  const fallbackOriginalPrice = originalPrice || 399;
  const calculatedDiscount =
    discountPercentage ||
    Math.round(((fallbackOriginalPrice - price) / fallbackOriginalPrice) * 100);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Link to={`/ebookdetail/${_id}`} className="group block">
      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50">
          {/* Discount Badge */}
          {calculatedDiscount > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{calculatedDiscount}%
            </div>
          )}

          {/* Rating Badge */}
          {rating && (
            <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{rating}</span>
            </div>
          )}

          {/* Image with Loading State */}
          <div className="h-64 flex items-center justify-center p-4">
            {!imageLoaded && !imageError && (
              <div className="animate-pulse bg-gray-200 w-48 h-56 rounded-lg"></div>
            )}

            {imageError ? (
              <div className="w-48 h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400">
                <svg
                  className="h-12 w-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-sm">E-Book</span>
              </div>
            ) : (
              <img
                src={imageFile}
                alt={title}
                className={`max-w-48 max-h-56 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Author */}
          {author && (
            <p className="text-sm text-orange-600 font-medium mb-2">
              by {author}
            </p>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">₹{price}</span>
              <span className="text-lg text-gray-400 line-through">
                ₹{fallbackOriginalPrice}
              </span>
            </div>
            {calculatedDiscount > 0 && (
              <span className="text-green-600 font-medium text-sm">
                Save ₹{fallbackOriginalPrice - price}
              </span>
            )}
          </div>

          {/* Features */}
          {/* <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-1">
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
            <div className="flex items-center space-x-1">
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
          </div> */}

          {/* Enhanced Button */}
          <div className="relative overflow-hidden rounded-lg">
            <Button
              value="Buy Now"
              color="btn-color"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg"
            />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Quick Preview Link */}
          {/* <div className="mt-3 text-center">
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium underline decoration-dotted underline-offset-2 transition-colors duration-300">
              Preview Sample
            </button>
          </div> */}
        </div>
      </article>
    </Link>
  );
};

export default EBookProducts;
