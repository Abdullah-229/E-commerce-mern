import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div className="container lg:w-[1400px] md:w-[768px] sm:w-[640px] mx-auto p-4 my-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Our Office</h2>
          <p className="mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Gadget Street, Tech City, TC 12345
          </p>
          <p className="mb-2">
            <FontAwesomeIcon icon={faEnvelope} /> Email: contact@onlinegadget.com
          </p>
          <p className="mb-2">
            <FontAwesomeIcon icon={faPhone} /> Phone: (123) 456-7890
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <p className="mb-2">
              <FontAwesomeIcon icon={faFacebook} /> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600">Facebook</a>
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faTwitter} /> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faInstagram} /> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600">Instagram</a>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <img src="https://talent.davies-group.com/wp-content/uploads/2023/05/United-Utilities-Keeping-customers-at-the-heart.jpg" alt="Office" className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
