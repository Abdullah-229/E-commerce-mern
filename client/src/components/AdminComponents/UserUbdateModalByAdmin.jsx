import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UserUpdateModalByAdmin = ({ user, setSelectedUser, fetchUsers }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    if (user && user._id) {
      setUserData({
        username: user.username,
        email: user.email,
        password: "",
        confirmPassword: "",
        role: user.role,
      });
    } else {
      setUserData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user._id) {
        await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          userData
        );
      } else {
        await axios.post("http://localhost:5000/api/register", userData);
      }
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <dialog id="update_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {user._id ? "Update User" : "Create New User"}
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {!user._id && (
            <>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                className="block w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="block w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </>
          )}
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mt-2"
          >
            {user._id ? "Update User" : "Create User"}
          </button>
        </form>
        <div className="modal-action">
          <button
            onClick={() => setSelectedUser(null)}
            className="bg-red-500 text-white p-2 rounded w-full mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

UserUpdateModalByAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default UserUpdateModalByAdmin;
