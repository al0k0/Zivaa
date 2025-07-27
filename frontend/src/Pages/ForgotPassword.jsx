import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({  duration: 250,     // ✨ faster animation (quarter second)
  offset: 50,        // ✨ triggers sooner when element is just entering
  easing: 'ease-in-out', // nice smooth in-out effect
  once: true  });
  }, []);

  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("OTP sent to your email");
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("OTP verified");
        setStep(3);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successfully");

        setTimeout(() => {
          navigate("/login");
          setStep(1);
          setEmail("");
          setOtp("");
          setNewPassword("");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <div
      data-aos="fade-up"
  data-aos-duration="150"
  data-aos-offset="30"
        className="space-y-5 bg-white p-6 rounded-md shadow-2xl w-[90%] max-w-md"
      >
        <h1 className="font-serif text-2xl text-center font-semibold text-zivaa-primary">
          Forgot Password?
        </h1>
        {message && <p className="text-sm text-red-500 text-center">{message}</p>}

        {step === 1 && (
          <div className="flex flex-col items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-md outline-none font-body border py-2 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-zivaa-accent transition"
            />
            <button
              onClick={handleSendOtp}
              className="bg-zivaa-accent text-white font-body py-2 px-4 rounded-md hover:opacity-80 transition"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full rounded-md outline-none font-body border py-2 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-zivaa-accent transition"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-zivaa-accent text-white font-body py-2 px-4 rounded-md hover:opacity-80 transition"
            >
              Verify
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-md outline-none font-body border py-2 px-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-zivaa-accent transition"
            />
            <button
              onClick={handleResetPassword}
              className="bg-zivaa-accent text-white font-body py-2 px-4 rounded-md hover:opacity-80 transition"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
</motion.div>
  );
};

export default ForgotPassword;
