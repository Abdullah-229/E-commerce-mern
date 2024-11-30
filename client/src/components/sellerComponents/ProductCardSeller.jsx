import React from 'react';
import PropTypes from 'prop-types';

const ProductCardSeller = ({ product, handleUpdateProduct, handleDeleteProduct }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="mb-4 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-green-500 font-bold">${product.price}</p>
            <div className="flex flex-col space-y-2">
                <button onClick={() => handleUpdateProduct(product)} className="bg-yellow-500 text-white p-2 rounded">Update</button>
                <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
        </div>
    );
};

ProductCardSeller.propTypes = {
    product: PropTypes.object.isRequired,
    handleUpdateProduct: PropTypes.func.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired,
};

export default ProductCardSeller;
