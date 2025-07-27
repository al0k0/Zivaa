import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
const Order = () => {
  const { cart } = useCart();

  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
  <div className="mt-24 px-4 sm:px-6 md:px-20">
  <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-6 text-gray-800">🧾 Order Summary</h2>

  {cart.length === 0 ? (
    <p className="text-gray-500 text-base sm:text-lg">You haven’t placed any orders yet.</p>
  ) : (
    <div className="space-y-4">
      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-start gap-4 p-3 sm:p-5 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          {/* Image */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden border border-gray-200">
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h3>

            <div className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 space-y-0.5">
              <p>Quantity: <span className="font-medium text-gray-900">{item.quantity}</span></p>
              <p>Price: ₹{item.price}</p>
              <p className="text-gray-900 font-semibold">Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </motion.div>
  );
};

export default Order;
