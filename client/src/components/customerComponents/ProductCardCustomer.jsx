import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ProductCardCustomer = ({ product, user}) => {
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        console.log(product,user);
        if (!user==='customer') {
            toast.error('You need to login first');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/cart', { user_id: user.id, product_id: product._id });
            if (response.status === 201) {
                toast.success('Added to cart successfully');
            }
        } catch (error) {
            toast.error('Failed to add to cart');
            console.error('Error adding to cart:', error);
        }
    };

    const handleBuyNow = () => {
        console.log(`Buying product with ID: ${product._id}`);
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <Toaster />
            <img src={product.image} alt={product.name} className="mb-4 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-green-500 font-bold">${product.price}</p>
            <div className="flex flex-col space-y-2">
                <button onClick={handleBuyNow} className="bg-blue-500 text-white p-2 rounded">Buy Now</button>
                <button onClick={handleAddToCart} className="bg-green-500 text-white p-2 rounded">Add to Cart</button>
            </div>
        </div>
    );
};

ProductCardCustomer.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default ProductCardCustomer;
