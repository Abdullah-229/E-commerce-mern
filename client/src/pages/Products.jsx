import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCardCustomer from "../components/customerComponents/ProductCardCustomer.jsx";
import ProductCardSeller from "../components/sellerComponents/ProductCardSeller.jsx";
import AddNewProduct from "../components/sellerComponents/AddNewProduct.jsx";
import UpdateProduct from "../components/sellerComponents/UpdateProduct.jsx";
import { debounce } from "lodash"; // Import lodash debounce

const Products = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = useMemo(() =>
    debounce((query) => {
      setSearchText(query);
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300), [products]
  );

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

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <span className="text-lg font-bold text-blue-400">Search</span>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) =>
          user.role !== "admin" ? (
            user.role === "seller" ? (
              <ProductCardSeller
                key={product._id}
                product={product}
                user = {user}
                handleUpdateProduct={openUpdateModal}
                handleDeleteProduct={handleDeleteProduct}
              >
                {highlightText(product.name, searchText)}
              </ProductCardSeller>
            ) : (
              <ProductCardCustomer key={product._id} product={product} user={user}>
                {highlightText(product.name, searchText)}
              </ProductCardCustomer>
            )
          ) : (
            <ProductCardCustomer
              key={product._id}
              product={product}
              user={user}
              navigate={navigate}
            >
              {highlightText(product.name, searchText)}
            </ProductCardCustomer>
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
