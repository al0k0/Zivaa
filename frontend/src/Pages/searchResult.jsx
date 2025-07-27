// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";
const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
const { addToCart}= useCart()
const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 250, offset: 30, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`https://zivaa.onrender.com/api/products/search?q=${query}`);
       if (res.ok) {
  const data = await res.json();
  setResults(Array.isArray(data) ? data : []);
}

      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) return <div className="mt-24 text-center text-gray-600">Loading search results...</div>;

  return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
    <div className="mt-24 px-6 md:px-20">
 <div className="text-center mb-10 space-y-2">
    <h1 className="text-3xl md:text-4xl font-serif font-bold text-zivaa-primary tracking-wide">
      Search Results
    </h1>
    <p className="text-gray-500 font-body text-lg">
      Showing results for: <span className="text-zivaa-accent font-semibold">{query}</span>
    </p>
    <div className="w-20 h-1 bg-zivaa-accent mx-auto mt-2 rounded-full"></div>
    </div>      {results.length === 0 ? (
        <p className="text-red-500">No products found.</p>
      ) : (
       <div className="flex flex-wrap gap-x-6 justify-center items-center">
  {results.length === 0 ? (
    <p className="text-red-500 text-lg">No products found.</p>
  ) : (
    results.map((product) => {
      const isInWishlist = (wishlist ?? []).some((item) => item._id === product._id);
      return (
        <div
  key={product._id}
  className="group card my-8 w-full lg:max-w-[90%] max-w-[45%] sm:max-w-[300px] sm:mr-6 flex flex-col items-center justify-center"
>

          <div className="relative cursor-pointer overflow-hidden lg:hover:scale-95 duration-300">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.images[0] || product.images}
                alt=""
                className="lg:hover:scale-110 duration-300 w-full object-cover"
              />
            </Link>
            <button
              className="absolute top-2 right-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                  setShowModal(true);
                } else {
                  isInWishlist
                    ? removeFromWishlist(product._id)
                    : addToWishlist(product);
                }
              }}
            >
              <i
                className={
                  isInWishlist
                    ? "fa-solid fa-heart text-zivaa-accent"
                    : "fa-regular fa-heart"
                }
              ></i>
            </button>
          </div>

          <div className="space-y-2 h-[180px] ">
            <h1 className="font-serif text-lg lg:text-2xl my-5 lg:line-clamp-none line-clamp-1  h-5">{product.name}</h1>
            <p className="font-body line-clamp-3 text-gray-400 text-sm lg:text-lg">
              {product.description}
            </p>
            <div className="relative w-full">
              <p className="Price font-body absolute transition-opacity text-base lg:text-lg">
                Rs. {product.price}
              </p>
              <button
                onClick={() => {
                  const userId = localStorage.getItem("userId");
                  if (!userId) {
                    setShowModal(true);
                  } else {
                    addToCart(product);
                  }
                }}
                className="Add-to-cart ml-3 uppercase font-body text-xs lg:text-base"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      );
    })
  )}
  {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-4">
          <div
            data-aos="fade-up"
            className="bg-white w-[90%] max-w-sm p-6 rounded-md shadow-2xl text-center space-y-5"
          >
            <h2 className="text-2xl font-serif font-semibold text-zivaa-primary">
              Login Required
            </h2>
            <p className="text-gray-600 font-body">
              You need to log in to add items to your wishlist.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-zivaa-accent text-white px-4 py-2 rounded-md font-body hover:opacity-80 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-zivaa-light text-zivaa-accent px-4 py-2 rounded-md font-body hover:opacity-80 transition"
              >
                Sign Up
              </Link>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-zivaa-dark font-body hover:underline mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}


</div>

      )}
    </div>
    </motion.div>
  );
};

export default SearchResults;
