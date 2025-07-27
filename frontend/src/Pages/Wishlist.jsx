import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
const {addToCart} = useCart()
 
  return (
      <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
    <div className="mt-20 px-4 md:px-16">
      <h1 className="text-3xl text-zivaa-primary font-serif font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in your wishlist. <Link to="/" className="text-blue-500">Shop Now</Link></p>
      ) : (
        <div className="flex flex-wrap gap-x-6 justify-center items-center">
          {wishlist.map((product) => (
            <div key={product._id} className="group card my-8 w-full lg:max-w-[24%] max-w-[45%] sm:max-w-[300px] sm:mr-6 flex flex-col items-center justify-center">
              <div className="relative cursor-pointer overflow-hidden lg:hover:scale-95 duration-300">
 <Link to={`/product/${product._id}`}>

              <img src={product.images} alt={product.name} className="lg:hover:scale-110 duration-300 w-full object-cover" />
               </Link>
            

              </div>
            <div className="flex my-2 items-center justify-center gap-3 flex-wrap sm:flex-nowrap">
  <button
    className="font-body text-zivaa-light bg-zivaa-accent px-3 py-2 text-sm rounded w-36 sm:w-40 whitespace-nowrap"
    onClick={() => removeFromWishlist(product._id)}
  >
    Remove from Wishlist
  </button>

  <button
    className="font-body text-zivaa-light bg-zivaa-accent px-3 py-2 text-sm rounded w-36 sm:w-40 whitespace-nowrap"
    onClick={() => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setShowModal(true);
      } else {
        addToCart(product);
      }
    }}
  >
    Add to Cart
  </button>
</div>


              </div>
            
          ))}
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default WishlistPage;
