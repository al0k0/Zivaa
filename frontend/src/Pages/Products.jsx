import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";
const Products = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 250, offset: 30, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetch(`http://localhost:5000/api/products/${categoryId}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [categoryId]);

  return (
       <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
    <div className="py-10 mt-16">
      <div className="text-center mb-8">
        <h2 className="text-6xl font-serif font-bold">Latest Collection</h2>
        <p className="text-gray-500 font-body text-lg mt-2">
          Check out our trending products
        </p>
      </div>

     <div className="flex flex-wrap gap-x-6 justify-center items-center">
  {products.map((product) => {
    const isInWishlist = (wishlist ?? []).some((item) => item._id === product._id);
    return (
      <div
        key={product._id}
        className="group card my-8 w-full lg:max-w-[24%] max-w-[45%] sm:max-w-[300px] sm:mr-6 flex flex-col items-center justify-center"
      >
        <div className="relative cursor-pointer overflow-hidden lg:hover:scale-95 duration-300">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.images}
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

        <div className="space-y-2 h-[180px]">
          <h1 className="font-serif text-lg lg:text-2xl my-5 lg:line-clamp-none line-clamp-1 h-5">
            {product.name}
          </h1>
          <p className="font-body line-clamp-3 text-gray-400 text-sm lg:text-lg">
            {product.description}
          </p>
         {/* Mobile layout: price and button inline */}
<div className="flex justify-between items-center w-full sm:hidden px-2">
  <p className="font-body text-base">Rs. {product.price}</p>
  <button
    onClick={() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setShowModal(true);
      } else {
        addToCart(product);
      }
    }}
    className="bg-zivaa-accent mt-2 text-white px-3 py-2 rounded text-xs"
  >
    Add to Cart
  </button>
</div>

{/* Desktop layout: hover effect */}
<div className="relative w-full hidden sm:block">
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
    className="Add-to-cart lg:ml-0 ml-3 uppercase font-body text-xs lg:text-base"
  >
    Add to cart
  </button>
</div>

        </div>
      </div>
    );
  })}
</div>


      {/* 🔥 Global Modal */}
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
    </motion.div>
  );
};

export default Products;
