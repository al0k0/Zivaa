import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import SearchModule from './searchModule';
import { motion } from "framer-motion";

const Header = () => {
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpendd, setIsOpendd] = useState(false);
const [searchTerm, setSearchTerm]= useState('')
  const [notFound, setNotFound] = useState(false);

  const dropdownRef = useRef();

  const closeDropdown = () => setIsOpen(false);
  const closeSearch = () => setIsOpendd(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      try {
        const res = await fetch(`https://zivaa.onrender.com/api/products/search?q=${searchTerm}`);
        if (res.status === 404) {
          setNotFound(true);
        } else {
        const products = await res.json();
setNotFound(false);
setSearchTerm('');
closeSearch();
navigate(`/search?q=${searchTerm}`);

        }
      } catch (err) {
        console.error("Search failed:", err);
        setNotFound(true);
      }
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <nav className="font-serif flex justify-between items-center bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 text-zivaa-text shadow-2xl p-3 px-6 md:px-12 fixed w-full top-0 z-50">
          <Link to="/" className="text-3xl font-semibold font-serif md:text-4xl tracking-widest text-zivaa-primary ">ZIVAA</Link>

          {/* Hamburger icon */}
      {/* Mobile: Search + Hamburger icon */}
<div className="md:hidden flex items-center gap-3">
  {/* Inline Search Input on Mobile */}
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
       value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
      className="border border-gray-300 text-sm px-3 py-1 rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-zivaa-accent"
    />
    <button className="absolute right-2 top-1 text-gray-500">
      <i className="fas fa-search"></i>
    </button>
  </div>

  {/* Hamburger icon */}
  <button
    onClick={() => setShowModal(prev => !prev)}
    className="text-zivaa-primary focus:outline-none"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</div>


          {/* Desktop Menu */}
          <ul className="hidden md:flex font-body items-center gap-8">
            <li><Link to="/" className="uppercase hover:text-zivaa-accent">Home</Link></li>
            <li><Link to="/shop" className="uppercase hover:text-zivaa-accent">Shop</Link></li>
            <li><Link to="/blog" className="uppercase hover:text-zivaa-accent">Blog</Link></li>
            <li><Link to="/contact" className="uppercase hover:text-zivaa-accent">Contact</Link></li>
          </ul>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6 font-body">
            {/* Wishlist */}
            <Link
              to={user ? "/wishlist" : "#"}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  setShowModal(true);
                }
              }}
              className="relative uppercase hover:text-zivaa-accent"
            >
              <i className="fa-regular fa-heart text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-zivaa-primary text-white text-xs px-1 rounded-full">
                {wishlist?.length ?? 0}
              </span>
            </Link>

            {/* Cart */}
            <Link
              to={user ? "/cart" : "#"}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  setShowModal(true);
                }
              }}
              className="relative hover:text-zivaa-accent"
            >
              <FaShoppingCart size={24} />
            </Link>

            {/* User/Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:text-zivaa-accent"
              >
                <FaUserCircle size={24} />
                <span className="hidden md:inline">{user ? user.name : ""}</span>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        onClick={closeDropdown}
                        className="block px-4 py-2 hover:bg-zivaa-accent hover:text-white border-b border-gray-200"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/order"
                        onClick={closeDropdown}
                        className="block px-4 py-2 hover:bg-zivaa-accent hover:text-white border-b border-gray-200"
                      >
                        Order
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          closeDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-zivaa-accent hover:text-white"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={closeDropdown}
                        className="block px-4 py-2 hover:bg-zivaa-accent hover:text-white border-b border-gray-200"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={closeDropdown}
                        className="block px-4 py-2 hover:bg-zivaa-accent hover:text-white"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsOpendd(true)}
                className="hover:text-zivaa-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" className="stroke-current" />
                  <line
                    x1="16"
                    y1="16"
                    x2="20"
                    y2="20"
                    className="stroke-current"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
       {showModal && (
        <>
  <div className="fixed w-full top-14 pt-5 z-50 bg-white text-black px-3 pb-4 shadow-xl md:hidden ">
    {[
      { label: "Home", path: "/" },
      { label: "Shop", path: "/shop" },
      { label: "Contact", path: "/contact" },
      { label: "Wishlist", path: user ? "/wishlist" : "/login" },
      { label: "Cart", path: user ? "/cart" : "/login" },
      { label: "Order", path: user ? "/order" : "/login" },
    ].map((item) => (
      <Link
        key={item.label}
        to={item.path}
        onClick={() => setShowModal(false)} // ✅ Close menu after click
        className="block uppercase text-base py-1 px-4 rounded hover:bg-zivaa-accent hover:text-white transition-all"
      >
        {item.label}
      </Link>
    ))}

    <hr className="my-2 border-gray-300" />

    {user ? (
      <>
        <Link
          to="/account"
          onClick={() => setShowModal(false)}
          className="block uppercase py-1 px-4 text-base rounded hover:bg-zivaa-accent hover:text-white transition-all"
        >
          My Profile
        </Link>
        <button
          onClick={() => {
            handleLogout();
            setShowModal(false);
          }}
          className="block w-full text-left text-base uppercase py-1 px-4 rounded hover:bg-zivaa-accent hover:text-white transition-all"
        >
          Logout
        </button>
      </>
    ) : (
      <Link
        to="/login"
        onClick={() => setShowModal(false)}
        className="block uppercase py-2 px-4 rounded hover:bg-zivaa-accent hover:text-white transition-all"
      >
        Sign In
      </Link>
    )}
  </div>
  
  
  </>
)}


        {/* Search Module */}
        {isOpendd && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center"
            onClick={(e) => {
              if (e.target.id === "search-wrapper") {
                setIsOpendd(false);
              }
            }}
            id="search-wrapper"
          >
            <SearchModule closeSearch={closeSearch} />
          </div>
        )}
      </header>
    </motion.div>
  );
};

export default Header;
