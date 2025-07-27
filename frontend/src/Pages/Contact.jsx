import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    text: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.subject) {
      alert('Please fill all the required fields!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contacts/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
      console.log('response', result);
    } catch (error) {
      console.error('error submitting form:', error);
    }
  };

  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
  <div id="contact" className="relative pt-20 px-5 lg:px-36 pb-20 mt-10 bg-[#CBAACB] overflow-hidden">
  {/* Decorative Custom Curve */}
  <div className="absolute top-0 left-0 w-full h-full bg-[#6F577D] opacity-30 blur-3xl z-0 custom-curve"></div>

  {/* Heading */}
  <div data-aos="fade-up" className="text-center space-y-6 mb-12 relative z-10">
    <h1 className="font-bold text-2xl lg:text-4xl text-white font-serif">
      Fashion Meets Conversation
    </h1>
    <p className="text-sm lg:text-lg text-white/90 font-body max-w-3xl mx-auto">
      Whether you have a question, feedback, or just want to talk style — we’re all ears.
      Let’s connect and make your fashion experience unforgettable.
    </p>
  </div>

  {/* Contact Info Boxes */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 relative z-10">
    {[
      {
        icon: <MapPin className="text-white w-6 h-6" />,
        title: 'Address',
        detail: '123 Fashion Street, Mumbai, MH 400001',
      },
      {
        icon: <Phone className="text-white w-6 h-6" />,
        title: 'Phone',
        detail: '+91 98765 43210',
      },
      {
        icon: <Mail className="text-white w-6 h-6" />,
        title: 'Email',
        detail: 'support@zyrefashion.com',
      },
      {
        icon: <Clock className="text-white w-6 h-6" />,
        title: 'Order Processing Time',
        detail: 'Orders processed within 1-2 business days.',
      },
    ].map((item, index) => (
      <div
        key={index}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md text-center flex flex-col items-center transition-all duration-300 text-white"
      >
        {item.icon}
        <h3 className="mt-3 font-semibold font-serif">{item.title}</h3>
        <p className="text-sm font-body">{item.detail}</p>
      </div>
    ))}
  </div>

  {/* Contact Form */}
  <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center gap-6 lg:gap-8 w-full lg:max-w-3xl mx-auto relative z-10"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    {['name', 'email', 'mobile', 'subject'].map((field, index) => (
      <input
        key={field}
        type={field === 'email' ? 'email' : 'text'}
        name={field}
        value={formData[field]}
        onChange={handleInputChange}
        placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
        className="w-full py-3 px-4 bg-white/20 text-white placeholder-white/70 rounded-md backdrop-blur-md font-body shadow-inner focus:outline-none"
        required
      />
    ))}

    <textarea
      name="text"
      value={formData.text}
      onChange={handleInputChange}
      placeholder="Write your message here..."
      className="w-full py-3 px-4 h-28 bg-white/20 text-white placeholder-white/70 rounded-md backdrop-blur-md font-body shadow-inner resize-none focus:outline-none"
    />

    <button
      type="submit"
      className="py-2 px-6 lg:py-3 lg:px-8 font-serif bg-[#EC0B43] rounded-full shadow-md hover:opacity-90 text-white transition duration-300"
    >
      Submit
    </button>
  </form>
</div>

    </motion.div>
  );
};

export default ContactPage;
