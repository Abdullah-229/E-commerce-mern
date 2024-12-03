import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const RegistrationForm = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('customer')) {
      setFormData((prevData) => ({ ...prevData, role: 'customer' }));
    } else if (path.includes('seller')) {
      setFormData((prevData) => ({ ...prevData, role: 'seller' }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    console.log(formData)

    try {
      const response = await axios.post(`http://localhost:5000/api/register`, formData);
      const { token } = response.data;

      if (token) {
        const decodedUser = jwtDecode(token);
        setUser({
          id: decodedUser.id,
          name: decodedUser.name,
          email: decodedUser.email,
          role: decodedUser.role,
        });
      }
      localStorage.setItem('token', token);

      toast.success('Registration successful!', { onClose: navigate('/products') });
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.response ? error.response.data.errors.map(err => err.message).join(', ') : 'Registration failed!');
    }
  };

  return (
    <div className="lg:w-[1400px] md:w-[768px] sm:w-[640px] h-screen">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default RegistrationForm;
