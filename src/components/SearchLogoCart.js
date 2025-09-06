import React, { useContext, useEffect, useState, useRef } from "react";
import { IoIosCart } from "react-icons/io";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchLogoCart.css";
import { Link, useNavigate } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";
import { ProductContext } from "../contexts/ProductsContext";
import logo from "../assets/novelezLogo.png";
import axios from "axios";
import { CartContext } from "../contexts/cart.context";

const SearchLogoCart = () => {
  const [cartLength, setCartLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  // Track failed images to prevent infinite retry loops
  const [failedImages, setFailedImages] = useState(new Set());

  const { userId } = useContext(LogInContext);
  const { allBooks, eBooks } = useContext(ProductContext);
  const { products } = useContext(CartContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const url = process.env.REACT_APP_URL;

  // Default placeholder image (use a data URL or a reliable placeholder service)
  const defaultPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAyNUM0MSAyNSA1MCAzNCA1MCA0NVM0MSA1NSAzMCA1NUMxOSA1NSAxMCA0NiAxMCAzNUMxMCAyNiAxOSAxNyAzMCAxN1oiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";

  const updateCartLength = () => {
    if (!userId) return;

    const userCartKey = `cart_${userId}`;
    const products = JSON.parse(localStorage.getItem(userCartKey)) || [];
    setCartLength(products.length);
  };

  useEffect(() => {
    updateCartLength();

    const interval = setInterval(() => {
      updateCartLength();
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  // Handle clicks outside search to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300); // 300ms delay for better UX

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const searchProducts = (query) => {
    if (!query.trim()) return;

    setIsSearching(true);

    // Filter products from your existing context data
    const localResults = searchInLocalData(query);
    setSearchResults(localResults);
    setShowResults(localResults.length > 0);
    setIsSearching(false);
  };

  // Enhanced local search function with better filtering
  const searchInLocalData = (query) => {
    const queryLower = query.toLowerCase().trim();
    if (!queryLower) return [];

    const combinedProducts = [...allBooks, ...eBooks];

    return combinedProducts
      .filter((product) => {
        // Search in multiple fields with better matching
        const searchFields = [
          product.title,
          product.name,
          product.author,
          product.category,
          product.description,
          product.tags,
          product.genre,
          product.publisher,
        ];

        // Check if any field contains the search query
        const hasMatch = searchFields.some((field) => {
          if (!field) return false;
          return field.toString().toLowerCase().includes(queryLower);
        });

        // Also check for partial word matches
        const words = queryLower.split(" ").filter((word) => word.length > 0);
        const hasWordMatch = words.some((word) => {
          return searchFields.some((field) => {
            if (!field) return false;
            return field.toString().toLowerCase().includes(word);
          });
        });

        return hasMatch || hasWordMatch;
      })
      .slice(0, 8); // Limit to 8 results for dropdown
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleProductClick = (product) => {
    // Navigate to product detail page using your route structure
    const productId = product._id || product.id;
    navigate(`/productDetails/${productId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    // Clear failed images when clearing search
    setFailedImages(new Set());
  };

  const getProductImage = (product) => {
    // Handle different image field names your API might use
    const imageUrl =
      product.image || product.coverImage || product.thumbnail || product.img;

    // If no image URL exists or this image has already failed, return placeholder
    if (!imageUrl || failedImages.has(imageUrl)) {
      return defaultPlaceholder;
    }

    return imageUrl;
  };

  const handleImageError = (imageUrl, e) => {
    // Add this image to failed images set to prevent retry
    setFailedImages((prev) => new Set(prev).add(imageUrl));
    // Set to default placeholder
    e.target.src = defaultPlaceholder;
  };

  const getProductName = (product) => {
    return product.name || product.title || "Unnamed Product";
  };

  const getProductPrice = (product) => {
    return product.price || product.cost || "N/A";
  };

  return (
    <section className="w-full lg:relative">
      <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center pt-10 pb-10 md:pt-0 md:pb-0 lg:pt-0 lg:pb-0 pl-10 pr-10 h-64 md:h-44 lg:h-44">
        {/* Enhanced Search */}
        <div className="flex w-full md:w-56 lg:w-80 relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Entire Store Here"
                value={searchQuery}
                onChange={handleInputChange}
                className="rounded-tl rounded border border-black h-10 bg-[#ffffff] pl-2 pr-8 w-full focus:outline-none focus:ring-2 focus:ring-secondary-color"
                id="search"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
            {/* <button
              type="submit"
              className="rounded-tr rounded-br pr-3 pl-3 bg-secondary-color text-white hover:bg-opacity-90 transition-colors"
            >
              <FaSearch />
            </button> */}
          </form>

          {/* Search Results Dropdown */}
          {showResults && (
            <div
              ref={resultsRef}
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-xl z-50 max-h-96 overflow-y-auto"
            >
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary-color mx-auto mb-2"></div>
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => {
                    const imageUrl = getProductImage(product);
                    return (
                      <div
                        key={product._id || product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex-shrink-0 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={getProductName(product)}
                            className="w-full h-full object-cover"
                            onError={(e) => handleImageError(imageUrl, e)}
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-800 truncate">
                            {getProductName(product)}
                          </h4>
                          {product.author && (
                            <p className="text-xs text-gray-500 truncate">
                              by {product.author}
                            </p>
                          )}
                          {product.category && (
                            <p className="text-xs text-gray-400 truncate">
                              {product.category}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm font-bold text-secondary-color">
                              ${getProductPrice(product)}
                            </p>
                            {product.inStock === false && (
                              <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {searchResults.length >= 8 && (
                    <div className="p-3 text-center border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-secondary-color hover:underline text-sm font-semibold"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <FaSearch className="mx-auto text-2xl mb-2 text-gray-300" />
                  <p>No products found for "{searchQuery}"</p>
                  <p className="text-xs mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="lg:absolute right-[40%]">
          <Link to="/">
            <img src={logo} className="w-28 md:w-40 lg:w-52 md:h-48 lg:h-48" />
          </Link>
        </div>

        {/* Cart */}
        <Link to="/cart">
          <div className="flex items-center hover:text-secondary-color hover:cursor-pointer">
            <div className="relative">
              <IoIosCart style={{ fontSize: 45 }} />
              {products.length > 0 && (
                <div className="absolute -bottom-4 -right-2 bg-secondary-color text-white h-8 w-8 flex justify-center items-center rounded-full text-sm">
                  {products.length}
                </div>
              )}
            </div>
            <p>MY CART</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SearchLogoCart;
