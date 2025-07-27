import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Signup = () => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFromData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.name.trim()) {
      alert("Please enter your full name");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    if (formData.password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }
  
    if (formData.mobile) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile)) {
        alert("Mobile number must be 10 digits only");
        return;
      }
    }

  
    try {
      const response = await fetch("https://zivaa.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      alert("Something went wrong!");
    }
  };

  return (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
 <div className="relative py-20 px-5 lg:px-36  mt-14 bg-[#CBAACB] overflow-hidden">
        {/* Decorative Shape */}
  <div className="absolute top-0 left-0 w-full h-full bg-[#6F577D] opacity-30 blur-3xl z-0 custom-curve"></div>

        {/* Form Section */}
        <div className="z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text */}
          <div className="hidden md:block w-1/2 text-white">
            <h1 className="text-4xl font-serif  mb-4">Join Zivaa</h1>
            <p className="text-lg font-serif">Create an account and unlock exclusive fashion experiences.</p>
          </div>

          {/* Signup Form */}
          <div className="backdrop-blur-lg bg-[#e8d9ff]/30 border border-white/10 shadow-xl rounded-2xl p-8 md:p-10 w-full md:w-[420px]">
            <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">Create Account</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full font-body px-4 py-2 bg-white/30 placeholder-white/70 text-white rounded-md shadow-inner focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full font-body px-4 py-2 bg-white/30 placeholder-white/70 text-white rounded-md shadow-inner focus:outline-none"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full font-body px-4 py-2 bg-white/30 placeholder-white/70 text-white rounded-md shadow-inner focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full font-body px-4 py-2 bg-white/30 placeholder-white/70 text-white rounded-md shadow-inner focus:outline-none"
              />
              <button
                type="submit"
                className="w-full font-serif bg-[#EC0B43] text-white font-semibold py-3 rounded-xl hover:bg-opacity-90 transition duration-300"
              >
                Sign Up
              </button>
            </form>

            <p className="text-white text-center mt-4 font-body">
              Already have an account?{" "}
              <a href="/login" className="underline text-white hover:text-gray-200 font-serif">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>


    </motion.div>
  )
}

export default Signup