import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Review from './Review'
import Products from "./Products"
import Show from "../Images/show.jpg"
import Banner from "../Images/banner.jpg"
import Brand1 from "../Images/brand1.png"
import Brand2 from "../Images/brand2.png"
import Brand3 from "../Images/brand3.png"
import Brand4 from "../Images/brand4.png"
import Brand5 from "../Images/brand5.png"
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { Facebook, Twitter, Youtube, Instagram, Github, Linkedin  } from 'lucide-react';

// const phrases = [
//   'Elevate Your Style.',
//   'Unleash the Diva in You.',
//   'Because You Deserve Luxury.',
//   'Trending Now: You.'
// ];


function Categories() {
  

  const [categories, setCategories] = useState([ ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
const navigate = useNavigate()
  useEffect(() => {
    fetch("https://zivaa.onrender.com/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);
  const handleCategoryClick = (categoryId)=>{
    setSelectedCategoryId(categoryId)
  }


  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
    <div className="mt-16 ">
 <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#6F577D] via-[#CBAACB] to-[#FAFAFA] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#EC0B43]/10 via-transparent to-transparent z-0"></div>

      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-zivaa-primary   drop-shadow-xl mb-4">
          Welcome to ZIVAA
        </h1>

        <h2 className="text-xl md:text-3xl font-medium text-[#FAFAFA]">
          <Typewriter
            words={[
              'Unleash the power of modern fashion.',
              'Redefine your wardrobe with elegance.',
              'Discover curated styles for every occasion.',
              'Shop the future. Today.',
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>

        <p className="mt-6 text-sm md:text-lg text-zivaa-secondaryText font-light">
          Experience the latest fashion trends exclusively designed for bold, confident, and stylish women. Join us and explore timeless designs with a modern twist.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto px-6 py-3 font-semibold rounded-full bg-[#EC0B43] text-white hover:bg-[#6F577D] transition-all duration-300 shadow-md">
            Explore Now
          </button>
          <button className="w-full sm:w-auto px-6 py-3 font-semibold rounded-full border border-[#EC0B43] text-[#EC0B43] hover:bg-[#EC0B43] hover:text-white transition-all duration-300 shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </section>
  
      <div className="space-y-24 ">
      
        {/* Section 1 */}
      <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000"  className="bg-gray-100">
  <h1 className="text-5xl font-serif text-center font-bold py-20 ">
    Shop by <span className="text-zivaa-accent">category</span>
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-10">
    {categories.map((category) => (
      <div
        key={category._id}
        className="flex flex-col items-center my-5"
        onClick={() => handleCategoryClick(category._id)}
      >
        <div
          onClick={() => navigate(`/products/${category._id}`)}
          className="text-center cursor-pointer shadow-xl rounded-xl bg-white p-4 transition-transform duration-300 hover:scale-105"
        >
          <img
            className="w-52 h-64 object-contain bg-gray-100 rounded-md shadow-md"
            src={category.img}
            alt={category.name}
          />
          <h1 className="font-serif font-bold mt-4 text-zivaa-text">
            {category.name}
          </h1>
          <h1 className="font-body text-2xl font-bold text-zivaa-primary">
            {category.desc}
          </h1>
          <button className="pb-2 font-body text-lg text-zivaa-accent hover:underline">
            {category.btn}
          </button>
        </div>
      </div>
    ))}
  </div>

  {selectedCategoryId && <Products selectedCategoryId={selectedCategoryId} />}
</div>


{/* Section2  */}
    <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000"  
     className="flex flex-col sm:flex-row justify-center gap-16 items-center">
  <div className="flex flex-col items-center space-y-2 text-center">
    <i className="fa-regular fa-calendar text-gray-400 text-4xl"></i>
    <h1 className="text-3xl font-serif tracking-wide leading-relaxed">Free Global Returns</h1>
    <p className="text-lg text-gray-400 font-body w-72">
      At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
    </p>
  </div>

  <div className="flex flex-col items-center space-y-2 text-center">
    <i className="fa-solid fa-bag-shopping text-gray-400 text-4xl"></i>
    <h1 className="text-3xl font-serif tracking-wide leading-relaxed">Pick up in store</h1>
    <p className="text-lg text-gray-400 font-body w-72">
      At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
    </p>
  </div>

  <div className="flex flex-col items-center space-y-2 text-center">
    <i className="fa-solid fa-gift text-gray-400 text-4xl"></i>
    <h1 className="text-3xl font-serif tracking-wide leading-relaxed">Special packaging</h1>
    <p className="text-lg text-gray-400 font-body w-72">
      At imperdiet dui accumsan sit amet nulla risus est ultricies quis.
    </p>
  </div>
</div>


{/* Section 3 */}
<div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
  <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden max-w-7xl w-full">
    
    {/* Left Side - Image */}
    <div className="lg:w-1/2 w-full h-64 lg:h-auto">
      <img
        src={Show}
        alt="Winter Collection"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Side - Content */}
    <div className="lg:w-1/2 w-full flex flex-col justify-center p-8 lg:p-12">
      <h1 className="font-serif text-3xl md:text-5xl text-gray-800 leading-tight">
        Classic Winter Collection
      </h1>
      <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed font-body">
        Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a.
        Ac sed eu fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero.
        Ultricies quam nunc, lorem sit lorem urna, pretium aliquam ut.
      </p>
      <button className="mt-6 bg-zivaa-accent hover:bg-opacity-80 text-white font-semibold py-2 px-5 rounded transition duration-300 uppercase">
        Shop Collection
      </button>
    </div>
  </div>
</div>


{/* Section 4 */}
<div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" className="relative  h-screen overflow-hidden">
  {/* Fullscreen Background Image */}
  <img
    src={Banner}
    alt=""
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  {/* Centered Rotating Circle and Button */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* SVG Circle with Rotating Text */}
      <svg className="w-full h-full animate-spin-slow" viewBox="0 0 200 200">
        <defs>
          <path
            id="circlePath"
            d="M 100, 100
              m -75, 0
              a 75,75 0 1,1 150,0
              a 75,75 0 1,1 -150,0"
          ></path>
        </defs>
        <text className="text-[14.4px] uppercase tracking-widest fill-white font-serif">
          <textPath href="#circlePath" startOffset="0%">
            Classic Collection 2022 • Classic Collection 2022 •
          </textPath>
        </text>
      </svg>

      {/* Center Button */}
      <button className="absolute px-4 py-2 bg-zivaa-accent text-white rounded-full text-lg font-semibold">
        Shop Now
      </button>
    </div>
  </div>
</div>


{/* Section 5 */}
<div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
  <Review />

  {/* Brands Section */}
 <div
  data-aos="fade-up"
  data-aos-delay="600"
  data-aos-duration="1000"
  className="flex flex-wrap justify-center items-center py-20 gap-10"
>
  {[Brand1, Brand2, Brand3, Brand4, Brand5].map((brand, index) => (
    <img
      key={index}
      src={brand}
      alt={`Brand ${index + 1}`}
      className="h-12 w-28 object-contain sm:h-14 sm:w-36"
    />
  ))}
</div>


  {/* Newsletter Section */}
<div
  data-aos="fade-up"
  data-aos-delay="700"
  data-aos-duration="1000"
  className="relative py-24 md:py-32 bg-gray-200 overflow-hidden flex items-center justify-center"
>
  {/* Background Watermark */}
  <div className="absolute inset-0 text-gray-500 opacity-5 text-5xl md:text-6xl font-body tracking-wider whitespace-nowrap pointer-events-none">
    <div className="absolute w-full h-full flex flex-wrap justify-center">
      {Array(20)
        .fill("")
        .map((_, i) => (
          <span key={i} className="m-6 md:m-10">
            NEWSLETTER &nbsp; NEWSLETTER &nbsp; NEWSLETTER
          </span>
        ))}
    </div>
  </div>

  {/* Newsletter Content */}
  <div className="relative z-10 w-full max-w-lg px-4 text-center space-y-5">
    <h2 className="text-2xl md:text-4xl font-serif tracking-wider leading-snug uppercase">
      Sign Up for our newsletter
    </h2>
    <input
      type="email"
      className="w-full rounded-md px-4 py-3 text-gray-700 text-base border focus:shadow-lg focus:outline-none transition-all duration-300"
      placeholder="Your E-mail Address"
    />
    <button className="uppercase bg-zivaa-accent text-white w-full py-3 font-semibold hover:opacity-80 duration-300">
      Sign Up
    </button>
  </div>
</div>


  {/* Footer Section */}
 <div
  data-aos="fade-up"
  data-aos-delay="800"
  data-aos-duration="1000"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 lg:gap-20 px-6 md:px-12 lg:px-24 py-20 bg-gray-100 text-start"
>
  {/* Zivaa Intro */}
  <div>
    <h1 className="font-serif text-3xl md:text-4xl uppercase mb-4 tracking-wider text-zivaa-primary">
      ZIVAA
    </h1>
    <p className="text-base md:text-lg font-body text-gray-500 tracking-wide leading-relaxed">
      Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla
      elementum diam in.
    </p>
    <div className="flex gap-5 py-6">
      <a href="#"><Facebook className="text-gray-500 hover:text-zivaa-accent transition" /></a>
      <a href="#"><Twitter className="text-gray-500 hover:text-zivaa-accent transition" /></a>
      <a href="#"><Youtube className="text-gray-500 hover:text-zivaa-accent transition" /></a>
      <a href="https://www.instagram.com/zivaahope_official/" target="_blank" rel="noopener noreferrer">
        <Instagram className="text-gray-500 hover:text-zivaa-accent transition" />
      </a>
      <a href="https://www.linkedin.com/company/zivaaofficial/" target="_blank" rel="noopener noreferrer">
        <Linkedin className="text-gray-500 hover:text-zivaa-accent transition" />
      </a>
    </div>
  </div>

  {/* Quick Links */}
  <div>
    <h2 className="text-xl md:text-2xl font-serif mb-4 uppercase tracking-wider">
      Quick Links
    </h2>
    <ul className="font-body space-y-2 text-gray-700">
      {["Home", "About", "Services", "Single Item", "Contact"].map((item, index) => (
        <li
          key={index}
          className="relative cursor-pointer w-fit overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>

  {/* Help & Info */}
  <div>
    <h2 className="text-xl md:text-2xl font-serif mb-4 uppercase tracking-wider">
      Help & Info
    </h2>
    <ul className="font-body space-y-2 text-gray-700">
      {[
        "Track your order",
        "Return + exchange",
        "Shipping + Delivery",
        "Contact Us",
        "Find us easy",
        "Faqs",
      ].map((item, index) => (
        <li
          key={index}
          className="relative cursor-pointer w-fit overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>

  {/* Contact */}
  <div className="tracking-wider space-y-4">
    <h2 className="text-xl md:text-2xl font-serif mb-4 uppercase">Contact Us</h2>
    <p className="text-gray-600 font-body text-base md:text-lg">
      Do you have any questions or suggestions?
    </p>
    <a
      href="mailto:contact@yourcompany.com"
      className="text-gray-800 relative cursor-pointer w-fit inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
    >
      contact@yourcompany.com
    </a>
    <p className="text-gray-600 font-body text-base md:text-lg mt-4">
      Do you need support? Give us a call.
    </p>
    <a
      href="tel:+911234567890"
      className="text-gray-800 text-base md:text-lg relative cursor-pointer w-fit inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
    >
      +91 1234567890
    </a>
  </div>
</div>

</div>

      </div>

      
    </div>
    </motion.div>
  );
}

export default Categories;
 