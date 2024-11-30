import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const Home = ({ user, handleLogout }) => {
  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="lg:ml-28 text-center md:mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Home;
