// components/AnimatedRoutes.jsx

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Products from '../Pages/Products';
import Wishlist from '../Pages/Wishlist';
import ProductInfo from '../Pages/ProductInfo';
import Cart from '../Pages/Cart';
import Order from '../Pages/Order';
import ForgotPassword from '../Pages/ForgotPassword';
import Contact from '../Pages/Contact';
import SearchResults from '../Pages/searchResult';
import Account from '../Pages/Account';
import ProtectedRoute from './ProtectedRoute';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/product/:productId" element={<ProductInfo />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
