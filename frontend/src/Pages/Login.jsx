import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from '../Images/signupBanner.png';
import { useAuth } from "../context/authContext";
import { motion } from "framer-motion";


const Login = () => {
  const {login} = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({}); // 🔥 Track errors
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://10.136.251.78:5000/api/auth/login", {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        
      });


      const data = await response.json();

      if (response.ok) {
         localStorage.setItem("token", data.token);
     login(data.user)
        navigate("/");
      } 
      else {
        setErrors({
          email: data.message || "Invalid email or password",
          password: data.message || "Invalid email or password",
        });
      }
      
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
 <div className="relative mt-14 px-5 lg:px-36 h-screen pt-20  bg-[#CBAACB] overflow-hidden">


  <div className="absolute top-0 left-0 w-full h-full bg-[#6F577D] opacity-30 blur-3xl z-0 custom-curve"></div>

      {/* Form Section */}
      <div className="z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Info (optional) */}
        <div className="hidden md:block w-1/2 text-white font-serif">
          <h1 className="text-4xl font-bold font-serif mb-4">Welcome Back!</h1>
          <p className="text-lg font-body">Login to continue exploring amazing deals and fashion picks.</p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-lg bg-white/20 border border-white/10 shadow-xl rounded-2xl p-8 md:p-10 w-full md:w-[420px]">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6 text-center">Login</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-body text-white mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full font-body p-3 rounded-xl bg-white/30 text-white placeholder-white/70 shadow-inner focus:outline-none"
                placeholder="you@example.com"
                  value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-body text-white mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 font-body rounded-xl bg-white/30 text-white placeholder-white/70 shadow-inner focus:outline-none"
                placeholder="Enter your password"
                  value={formData.password}
  onChange={handleChange} 
              />
            </div>

            <button
              type="submit"
              className="w-full font-serif bg-zivaa-accent text-white font-semibold py-3 rounded-xl hover:bg-opacity-90 transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="text-white font-serif text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="underline font-body text-white hover:text-gray-200">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Login;
