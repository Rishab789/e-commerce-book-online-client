import React, { useState, useEffect } from "react";
import { Home, Search, ArrowLeft, Zap } from "lucide-react";

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.length > 1
      ? window.history.back()
      : (window.location.href = "/");
  };

  const handleSearch = () => {
    window.location.href = "/search";
  };

  const handleSuggestionClick = (suggestion) => {
    window.location.href = `/search?q=${suggestion.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Interactive mouse follower */}
      {isHovering && (
        <div
          className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transition: "all 0.1s ease-out",
          }}
        />
      )}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main 404 Text with Glitch Effect */}
        <div className="relative mb-8">
          <h1
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse select-none cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-20 animate-ping">
            404
          </div>
        </div>

        {/* Glitch text effect */}
        <div className="relative mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 relative">
            <span className="relative z-10">PAGE NOT FOUND</span>
            <span className="absolute inset-0 text-cyan-400 animate-pulse opacity-50">
              PAGE NOT FOUND
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Oops! Looks like you've ventured into the digital void. The page
            you're looking for has vanished into cyberspace.
          </p>
        </div>

        {/* Floating elements */}
        <div className="relative mb-12">
          <div className="animate-bounce delay-100">
            <Zap
              className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleGoHome}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Take Me Home
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>

          <button
            onClick={handleGoBack}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full hover:from-purple-400 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>

          <button
            onClick={handleSearch}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
          >
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Products
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Fun suggestions */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Or try one of these popular searches:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Electronics", "Books", "Accessories", "Best Sellers"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>

        {/* Animated floating shapes */}
        <div
          className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute -top-5 -right-16 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-40 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-10 -left-16 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-5 -right-10 w-18 h-18 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-35 animate-bounce"
          style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
        ></div>

        {/* Glitch lines effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Background grid effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

// export default NotFoundPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search, ArrowLeft, Zap } from "lucide-react";

const NotFoundPages = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Interactive mouse follower */}
      {isHovering && (
        <div
          className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transition: "all 0.1s ease-out",
          }}
        />
      )}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main 404 Text with Glitch Effect */}
        <div className="relative mb-8">
          <h1
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-20 animate-ping">
            404
          </div>
        </div>

        {/* Glitch text effect */}
        <div className="relative mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 relative">
            <span className="relative z-10">PAGE NOT FOUND</span>
            <span className="absolute inset-0 text-cyan-400 animate-pulse opacity-50">
              PAGE NOT FOUND
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Oops! Looks like you've ventured into the digital void. The page
            you're looking for has vanished into cyberspace.
          </p>
        </div>

        {/* Floating elements */}
        <div className="relative mb-12">
          <div className="animate-bounce delay-100">
            <Zap
              className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Take Me Home
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>

          <button
            onClick={handleGoBack}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full hover:from-purple-400 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => navigate("/search")}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
          >
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Products
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Fun suggestions */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Or try one of these popular searches:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Electronics", "Books", "Accessories", "Best Sellers"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() =>
                    navigate(`/search?q=${suggestion.toLowerCase()}`)
                  }
                  className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>

        {/* Animated floating shapes */}
        <div
          className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute -top-5 -right-16 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-40 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-10 -left-16 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-5 -right-10 w-18 h-18 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-35 animate-bounce"
          style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* CSS for additional effects */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch:hover {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
