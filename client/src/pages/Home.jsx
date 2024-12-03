import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "./Products"; // Import the Products component
import { Outlet, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import HeroSection from "../components/sellerComponents/HeroSection";

const Home = ({ user, handleLogout }) => {
  const location = useLocation();

  return (
    <div >
      <Navbar user={user} handleLogout={handleLogout} />
      {location.pathname === "/" && (
        <div className="lg:w-[1400px] lg:mx-0 md:w-[768px] sm:w-[640px] text-center md:mt-20">
          <HeroSection />
          <Products user={user} />
        </div>
      )}
      {location.pathname !== "/" && (
        <div className="lg:w-[1400px] md:w-[768px] sm:w-[640px] text-center md:mt-20">
          <Outlet />
        </div>
      )}
      <Footer />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Home;
