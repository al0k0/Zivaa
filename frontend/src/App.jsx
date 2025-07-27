import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import AnimatedRoutes from './components/AnimatedRoutes'; // ✅ new file

import './App.css';
import Header from './components/Header';
import Footer from './components/footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      offset: 100,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <WishlistProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between">
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes /> {/* ✅ now useLocation is inside Router */}
          </main>
          <Footer />
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
