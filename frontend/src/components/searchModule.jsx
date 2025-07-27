import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModule = ({ closeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [notFound, setNotFound] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10); // triggers animation
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm
      transition-all duration-300 ease-in-out
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      onClick={closeSearch}
    >
      <div
        className="w-11/12 md:w-6/12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center relative mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute left-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="16" y1="16" x2="20" y2="20" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Type product name and press Enter"
            className="bg-transparent border-b border-gray-500 pl-12 pr-4 py-2 w-full text-2xl rounded-lg shadow-2xl text-white outline-none"
          />
        </div>

        
        
     
      </div>
    </div>
  );
};

export default SearchModule;
