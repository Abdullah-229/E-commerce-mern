import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
        setCartItems(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [user]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.product_id.price, 0);
    setTotalAmount(total);
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="container mx-auto min-w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center bg-white p-4 rounded shadow">
            <img src={item.product_id.image} alt={item.product_id.name} className="w-20 h-20 object-cover mr-4" />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{item.product_id.name}</h2>
              <p className="text-green-500 font-bold">${item.product_id.price}</p>
            </div>
            <button onClick={() => handleRemoveFromCart(item._id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

Cart.propTypes = {
  user: PropTypes.object.isRequired, // Add prop validation here
};

export default Cart;
