import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white p-4 ">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-semibold">Online Gadget</Link>
        </div>
        <div className="space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/products" className="hover:underline">Products</Link>
        </div>
      </div>
      <div className="container mx-auto mt-4 text-center">
        <p>&copy; 2023 Online Gadget. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
