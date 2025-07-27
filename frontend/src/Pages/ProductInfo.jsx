import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
const ProductInfo = () => {
  const { productId } = useParams();
  const [info, setInfo] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnim, setShowAnim] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist?.some(item => item._id === info?._id);

  useEffect(() => {
    AOS.init({ duration: 250, offset: 30, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    setTimeout(() => setShowAnim(true), 100);
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://10.136.251.78:5000/api/products/product/${productId}`);
        const data = await res.json();
        setInfo(data);
        if (data?.size?.[0]) setSelectedSize(data.size[0]);
      } catch (err) {
        console.error('Error fetching product info:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) getInfo();
  }, [productId]);

  if (loading || !info || !info.name) {
    return (
      <div className="mt-24 px-6 md:px-20 font-sans text-center text-gray-600 text-lg">
        Loading product info...
      </div>
    );
  }

  return (
        <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
    <div
  className={`px-4 sm:px-6 md:px-20 font-sans transition-all duration-500 ease-in-out transform ${
    showAnim ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
  }`}
>
  <div className="flex flex-col md:flex-row lg:gap-12 gap-8 items-start mt-20">
    {/* Left: Product Image */}
    <div className="relative w-full md:w-auto max-w-sm mx-auto group">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl"></div>
      )}
      <img
        src={info.images?.[selectedColorIndex] || info.images?.[0]}
        alt={info.name}
        onLoad={() => setImageLoaded(true)}
        className={`rounded-2xl w-full object-cover shadow-lg duration-300 transition-opacity ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Wishlist Heart Icon */}
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

    {/* Right: Product Details */}
    <div className="space-y-5 sticky top-24 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">{info.name}</h1>

      <p className="text-gray-600 text-sm leading-relaxed font-body">{info.description}</p>

      <p className="text-lg font-semibold font-body">₹{info.price}</p>

      {/* Size Selection */}
      {info.size?.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-base font-body">Size:</span>
          {info.size.map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-sm font-body rounded-lg border ${
                selectedSize === size
                  ? 'bg-zivaa-accent text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      {/* Color Selection */}
      {info.color?.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-base font-body">Color:</span>
          {info.color.map((color, index) => (
            <button
              key={index}
              title={color}
              onClick={() => setSelectedColorIndex(index)}
              className={`w-5 h-5 rounded-full font-body border-2 transition-all duration-200 ${
                selectedColorIndex === index ? 'border-black scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={() => {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            setShowModal(true);
          } else {
            addToCart(info);
          }
        }}
        className="bg-zivaa-accent hover:opacity-75 text-white px-4 py-2 rounded-xl text-md shadow transition w-full sm:w-auto"
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* Modal */}
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

export default ProductInfo;
