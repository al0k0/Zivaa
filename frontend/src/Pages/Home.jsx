import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Review from './Review'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from "../Images/slider1.png"
import Slider2 from "../Images/slider2.png"

import Slider3 from "../Images/slider3.png"
import Products from "./Products"
import Show from "../Images/show.jpg"
import Banner from "../Images/banner.jpg"
import Brand1 from "../Images/brand1.png"
import Brand2 from "../Images/brand2.png"
import Brand3 from "../Images/brand3.png"
import Brand4 from "../Images/brand4.png"
import Brand5 from "../Images/brand5.png"
import { motion } from "framer-motion";
import { Facebook, Twitter, Youtube, Instagram, Github, Linkedin  } from 'lucide-react';


function Categories() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [categories, setCategories] = useState([ ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
const navigate = useNavigate()
  useEffect(() => {
    fetch("http://10.136.251.78:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);
  const handleCategoryClick = (categoryId)=>{
    setSelectedCategoryId(categoryId)
  }


  // const [bestSellingProducts, setBestSellingProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/products/best-sellers")
  //     .then(response => {
  //       console.log("Best Selling Products Data:", response.data); // ✅ Console log API response
  //       setBestSellingProducts(response.data);
  //     })
  //     .catch(error => console.error("Error fetching best sellers:", error));
  // }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: i => (
      <div
        style={{
          width: i === currentSlide ? '10px' : '8px',
          height: i === currentSlide ? '10px' : '8px',
          backgroundColor: i === currentSlide ? 'black' : 'gray',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      ></div>
    ),
    appendDots: dots => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
      }}>
        <ul style={{ margin: '15px', display: 'flex', gap: '8px' }}>{dots}</ul>
      </div>
    )
  };
  

  const setting = {
    dots: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    // // autoplay: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        // breakpoint: 1024,
        settings: {
          // slidesToShow: 3,
          // slidesToScroll: 1,
        }
      },
      {
        // breakpoint: 600,
        settings: {
          // slidesToShow: 2,
          // slidesToScroll: 1,
        }
      },
      {
        // breakpoint: 480,
        settings: {
          // slidesToShow: 1,
          // slidesToScroll: 1,
        }
      }
    ]
  };
  
  
  return (
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
    <div className="mt-16 ">
      <div className="relative ">
        <Slider {...settings}>
          {/* SLIDER 1  */}

      <div className="relative border-r-2 lg:h-96 shadow-md bg-zivaa-primary"> {/* ✅ bg added here */}
  <img
    src={Slider1}
    alt="slider1"
    className="relative h-full"
  />
  <div className="absolute inset-0 bg-black opacity-25"></div>

  <div
    className={`absolute inset-0 flex flex-col items-center justify-center text-center lg:gap-10 ${
      currentSlide === 0 ? "animate-fade-in" : "opacity-0"
    }`}
  >
    <h1 className="font-serif lg:text-6xl text-3xl lg:mt-0 mt-20 font-bold text-zivaa-lavender "> {/* ✅ black text for ivory bg */}
      Elevate Your Everyday
    </h1>
    <p className="max-w-[60rem] text-zivaa-light py-5 lg:py-0 font-body tracking-wider text-sm lg:text-base">
Uncover signature styles that define confidence and grace    </p>
    <div className="lg:space-x-10 space-x-5 lg:mt-0 mt-10">
      <button className="inline-block border border-gray-400 cursor-pointer relative overflow-hidden text-white bg-transparent font-bold lg:py-2 py-1 px-2 lg:px-4 rounded-md transition-all duration-500 ease-in-out group">
        <span className="relative z-10 text-sm lg:text-base">
          SHOP NOW <i className="fa-solid fa-arrow-right"></i>
        </span>
        <span className="absolute top-0 left-0 w-full lg:w-12 h-full bg-zivaa-accent transform transition-all duration-500 group-hover:w-full ease-in-out lg:group-hover:bg-zivaa-accent"></span>
      </button>

      <button className="inline-block border border-gray-400 cursor-pointer relative overflow-hidden text-white bg-transparent font-bold lg:py-2 py-1 px-2 lg:px-7 rounded-md transition-all duration-500 ease-in-out group">
        <span className="relative z-10 text-sm lg:text-base">
          EXPLORE <i className="fa-solid fa-arrow-right"></i>
        </span>
        <span className="absolute top-0 left-0 w-full lg:w-12 h-full bg-zivaa-accent transform transition-all duration-500 group-hover:w-full ease-in-out lg:group-hover:bg-zivaa-accent"></span>
      </button>
    </div>
  </div>
</div>


          {/* SLIDER 2 */}

          <div className="relative border-r-2 bg-zivaa-primary shadow-md">
            <div className="flex">
              <img
                src={Slider2}
                alt="slider"
                className=" mt-16 lg:mt-0  lg:h-96 "
              />
             
            </div>
            <div className="absolute inset-0 bg-black opacity-25"></div>

            <div className={`  absolute inset-0 flex flex-col items-center justify-center text-center gap-5 lg:gap-10 ${currentSlide === 1 ? 'animate-fade-in' : 'opacity-0'}`} >
              <h1 className="  font-serif text-3xl lg:text-4xl font-bold mt-20 lg:mt-0 leading-normal text-zivaa-lavender tracking-wide ">Summer Muse Collection</h1>
              <p className=" max-w-[50rem] font-body text-white   tracking-wider text-sm lg:text-lg">Celebrate the essence of femininity this summer with timeless silhouettes and breezy designs made to inspire and empower.</p>
              <div className="space-x-10">
               

                <button className="bg-zivaa-accent text-sm mt-10 lg:mt-0  lg:text-base font-body text-zivaa-light lg:px-2 lg:py-2 py-1 px-2 uppercase rounded font-semibold hover:bg-zivaa-light hover:text-zivaa-accent transition duration-300">
                  Summer Collection
                </button>
              </div>
            </div>
          </div>

          {/* SLIDER 3 */}
          <div className="relative border   border-r-2 bg-zivaa-primary shadow-md ">
<div className="flex items-end justify-end">
<img
  src={Slider3}
  alt="slider1"
  className=" relative lg:h-96 top-2  lg:mt-0 mt-2 "/>
</div>
<div className="absolute inset-0 bg-black opacity-25"></div>

<div className={` absolute inset-0 flex flex-col items-center justify-center text-center mx-5 lg:mx-40 gap-5 lg:gap-10 ${currentSlide === 2 ? 'animate-fade-in' : 'opacity-0'}`} >
  <h1 className="font-serif text-3xl lg:text-4xl mt-20 lg:mt-0 font-bold text-zivaa-lavender  tracking-wider  ">Discover the Latest Trends</h1>
  <p className=" lg:text-lg text-sm tracking-wider  font-body text-white">Get up to <span className="font-bold font-body text-zivaa-accent">50% OFF</span> on our latest collection.</p>
  <button className=" bg-zivaa-accent text-zivaa-light font-body lg:px-4 px-2 py-1 lg:py-2 lg:text-base text-sm rounded font-semibold uppercase tracking-wider">
    Grab the Deal
  </button>
</div>
</div>
         
        </Slider>
          
      </div>
  
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
 