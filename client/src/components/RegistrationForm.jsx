import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ setUser, setLogin }) => {
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

    try {
      const response = await axios.post(`http://localhost:5000/api/register/${formData.role}`, formData);
      const { token, role } = response.data;
      console.log(response.data)

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setUser(role);
      setLogin(true);
      toast.success('Registration successful!', { onClose: () => navigate('/products') });
    } catch (error) {
      console.error('Error during registration:', error);
      setUser('');
      setLogin(false);
      toast.error(error.response ? error.response.data.errors.map(err => err.message).join(', ') : 'Registration failed!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

RegistrationForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
};

export default RegistrationForm;
