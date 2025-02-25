import React, { useState, useEffect } from "react";
import axios from "axios";
import UserUpdateModalByAdmin from "./UserUpdateModalByAdmin";

const AdminUserHome = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users?page=1&limit=10");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users?searchEmail=${searchEmail}`);
      if (response.data.users.length === 0) {
        setNoUserFound(true);
        setFilteredUsers([]);
      } else {
        setFilteredUsers(response.data.users);
        setNoUserFound(false);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setNoUserFound(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const displayedUsers = filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="py-7">
        <button
          onClick={() => setSelectedUser({})}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create New User
        </button>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      <div>
        {noUserFound ? (
          <p className="text-red-500">No user found</p>
        ) : (
          displayedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded p-4 flex justify-between gap-10 items-center mb-2"
            >
              <div>
                <h2 className="font-bold">{user.username}</h2>
                <p>{user.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedUser && (
        <UserUpdateModalByAdmin
          user={selectedUser}
          setSelectedUser={setSelectedUser}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
};

export default AdminUserHome;
