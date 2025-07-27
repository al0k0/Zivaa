import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useOrder } from '../context/orderContext';
import { motion } from "framer-motion";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { placeOrder } = useOrder();

  const handleQtyChange = (productId, qty) => {
    if (qty >= 1) updateQuantity(productId, qty);
  };

  const handlePlaceOrder = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId) {
      alert("User not found. Please login first.");
      return;
    }

    try {
      await placeOrder(userId, cart);
      navigate("/order");
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
   <div className="mt-20 px-4 md:px-16 pb-16 flex flex-col md:flex-row gap-8">
  {cart.length === 0 ? (
    <div className="text-center w-full mt-16 text-lg sm:text-xl font-body text-gray-600">
      🛒 Your cart is empty.
    </div>
  ) : (
    <>
      {/* Cart Items */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zivaa-primary mb-6">
          Your Cart
        </h2>

        {cart.map((item) => {
          const { _id, name, price, images, quantity } = item;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border rounded-xl p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition-all"
            >
              {/* Image and Info */}
              <div className="flex gap-4 items-start">
                <img
                  src={images?.[0] || "/placeholder.jpg"}
                  alt={name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="font-semibold font-body text-base sm:text-lg">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 font-body mt-1">
                    ₹{price}
                  </p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                <div className="flex items-center border rounded overflow-hidden">
                  <button
                    onClick={() => handleQtyChange(_id, quantity - 1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 font-bold text-lg hover:bg-gray-200"
                  >
                    −
                  </button>
                  <div className="px-4 py-2 text-sm sm:text-base font-body">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQtyChange(_id, quantity + 1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 font-bold text-lg hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(_id)}
                  className="text-red-600 hover:underline font-body text-sm sm:text-base"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Summary */}
      <div className="w-full md:w-1/3 border rounded-xl p-5 sm:p-6 shadow bg-white h-fit">
        <h3 className="font-serif text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-zivaa-primary">
          Price Details
        </h3>

        <div className="flex justify-between mb-3 font-body text-gray-600 text-sm sm:text-base">
          <span>
            Price ({cart.length} item{cart.length > 1 ? "s" : ""})
          </span>
          <span>₹{totalAmount}</span>
        </div>

        <div className="flex justify-between mb-3 font-body text-gray-600 text-sm sm:text-base">
          <span>Delivery</span>
          <span className="text-green-600 font-semibold">Free</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-base sm:text-lg font-body">
          <span className="text-gray-700 font-semibold">Total Amount</span>
          <span className="text-zivaa-accent font-bold">₹{totalAmount}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 py-2 sm:py-3 bg-zivaa-accent text-white font-body text-sm sm:text-lg rounded-md hover:opacity-80 transition"
        >
          Place Order
        </button>
      </div>
    </>
  )}
</div>

    
    </motion.div>
  );
};

export default Cart;
