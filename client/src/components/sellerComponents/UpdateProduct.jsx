import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateProduct = ({ product, handleUpdateProduct }) => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
    });

    useEffect(() => {
        if (product) {
            setProductData({
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${product._id}`, productData);
            handleUpdateProduct(response.data);
            document.getElementById('update_modal').close();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Product</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            placeholder="Product Price"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="image"
                            value={productData.image}
                            onChange={handleChange}
                            placeholder="Product Image URL"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <textarea
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            placeholder="Product Description"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-2">Update Product</button>
                    </form>
                    <div className="modal-action">
                        <button onClick={() => document.getElementById('update_modal').close()} className="bg-red-500 text-white p-2 rounded w-full mt-2">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

UpdateProduct.propTypes = {
    product: PropTypes.object.isRequired,
    handleUpdateProduct: PropTypes.func.isRequired,
};

export default UpdateProduct;
