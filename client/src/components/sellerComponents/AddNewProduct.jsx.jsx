import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddNewProduct = ({ handleAddProduct }) => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
    });

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const CreateProduct = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/products', productData);
            handleAddProduct(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CreateProduct();
        setProductData({ name: '', price: '', image: '', description: '' });
        document.getElementById('my_modal_1').close();
    };

    return (
        <div>
            <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Add new Product</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
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
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-2">Add Product</button>
                    </form>
                    <div className="modal-action">
                        <button onClick={() => document.getElementById('my_modal_1').close()} className="bg-red-500 text-white p-2 rounded w-full mt-2">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

AddNewProduct.propTypes = {
    handleAddProduct: PropTypes.func.isRequired,
};

export default AddNewProduct;
