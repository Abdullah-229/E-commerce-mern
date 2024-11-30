import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCardCustomer from "../components/customerComponents/ProductCardCustomer.jsx";
import ProductCardSeller from "../components/sellerComponents/ProductCardSeller.jsx";
import AddNewProduct from "../components/sellerComponents/AddNewProduct.jsx";
import UpdateProduct from "../components/sellerComponents/UpdateProduct.jsx";

const Products = ({user }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  // Retrieve user data from localStorage and set it as user information
  console.log("user is product:",user)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    document.getElementById("update_modal").showModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) =>
          (user.role !== "admin") ? (
            user.role === "seller" ? (
              <ProductCardSeller
                key={product._id}
                product={product}
                handleUpdateProduct={openUpdateModal}
                handleDeleteProduct={handleDeleteProduct}
              />
            ) : (
              <ProductCardCustomer key={product._id} product={product} user={user} />
            )
          ) : (
            <ProductCardCustomer
              key={product._id}
              product={product}
              user={user}
              navigate={navigate}
            />
          )
        )}
      </div>
      {user.role === "seller" && (
        <AddNewProduct handleAddProduct={handleAddProduct} />
      )}
      {currentProduct && (
        <UpdateProduct
          product={currentProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}
    </div>
  );
};

Products.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Products;
