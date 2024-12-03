import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { token } = response.data;
      if (token) {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser);
        setUser({
          id: decodedUser.id,
          name: decodedUser.name,
          email: decodedUser.email,
          role: decodedUser.role,
        });
      }

      localStorage.setItem('token', token);

      toast.success('Login successful!', navigate('/products'));
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.response ? error.response.data.error : 'Login failed!');
    }
  };

  return (
    <div className="lg:w-[1400px] md:w-[768px] sm:w-[640px] h-screen">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/register/customer')}
            className="mt-4 text-blue-500 hover:underline"
          >
            Create Account
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
