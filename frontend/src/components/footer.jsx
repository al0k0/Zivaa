import React from 'react'
import ShipIcon from "../Images/shipicon.png"
import DhlLogo from "../Images/dhl-logo.png"
import MasterCard from "../Images/master-card.png"
import Paypal from "../Images/paypal-card.png"
import VisaCagrd from "../Images/visa-card.png"

const footer = () => {
  return (
<div className="w-full border-t border-black px-4 sm:px-6 md:px-12 lg:px-24 py-6 bg-white">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
    
    {/* Shipping & Payment Section */}
    <div className="flex flex-col items-center text-gray-600 font-body text-sm sm:text-base gap-4">
      {/* Shipping Row */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">We ship with:</span>
        <div className="flex gap-3  justify-center items-center">
          <img src={ShipIcon} alt="Shipping Icon" className="h-6 w-auto" />
          <img src={DhlLogo} alt="DHL Logo" className="h-6 w-auto" />
        </div>
      </div>

      {/* Payment Row */}
      <div className="flex   items-center gap-2">
        <span className="whitespace-nowrap">Payment Options:</span>
        <div className="flex gap-3 justify-center items-center">
          <img src={VisaCagrd} alt="Visa Card" className="h-6 w-auto" />
          <img src={Paypal} alt="PayPal Logo" className="h-6 w-auto" />
          <img src={MasterCard} alt="MasterCard" className="h-6 w-auto" />
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="text-center lg:text-right text-gray-500 font-body text-sm sm:text-base">
      <p>
        © 2025 Zivaa. Design by{" "}
        <a
          href="https://al0kportfolio.netlify.app"
          className="text-black hover:underline"
        >
          Alok
        </a>
      </p>
      <p>
        Distribution by{" "}
        <a href="https://al0kportfolio.netlify.app" className="text-black hover:underline">
          Alok
        </a>
      </p>
    </div>
  </div>
</div>




  )
}

export default footer