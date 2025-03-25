"use client";
import React, { useState, useEffect } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import '@/styles/admin/Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://temp-rails-1.onrender.com/api/products');
      const data = await response.json();
      if (Array.isArray(data.templates) &&  data.templates.length > 0) {
        setProducts(data.templates);
      } else {
        console.error('Fetched data is not an array');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on name and stock
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStockFilter = stockFilter === 'all' || product.status === stockFilter; // Ensure 'stock' exists on ProductType
    return matchesSearchTerm && matchesStockFilter;
  });

  const openForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://temp-rails-1.onrender.com/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(product => product.id !== id));
      setPopupMessage('Product deleted successfully.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setPopupMessage('Error deleting product.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleCreateOrUpdateProduct = async (product) => {
    if (editingProduct) {
      // Update product
      try {
        await fetch(`https://temp-rails-1.onrender.com/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        setProducts(products.map(p => p.id === product.id ? product : p));
        setPopupMessage('Product updated successfully.');
      } catch (error) {
        console.error('Error updating product:', error);
        setPopupMessage('Error updating product.');
      }
    } else {
      // Create product
      try {
        await fetch('https://temp-rails-1.onrender.com/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        setProducts([...products, { ...product, id: products.length + 1 }]);
        setPopupMessage('Product created successfully.');
      } catch (error) {
        console.error('Error creating product:', error);
        setPopupMessage('Error creating product.');
      }
    }
    closeForm();
    setShowPopup(true);
    fetchProducts();
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="content">
      <h2>Product Management</h2>

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="stock-filter"
        >
          <option value="all">All</option>
          <option value="publish">publish</option>
          <option value="unpublish">unpublish</option>
        </select>

        <button onClick={() => openForm()} className="create-product">Create Product</button>
      </div>
      
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Counter</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="loader-cell">
                <div className="loader"></div>
              </td>
            </tr>
          ) : filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="error-message">
                No Record found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.status}</td>
                <td>{product.counter}</td>
                <td>{new Date(product.created_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => openForm(product)} className="edit-button">Edit</button>
                  <button
                    onClick={() => product.id && handleDelete(product.id)} // Ensure the ID is valid
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isFormOpen && (
        <ProductForm
          onClose={closeForm}
          onSubmit={handleCreateOrUpdateProduct}
          editingProduct={editingProduct}
        />
      )}

      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
}

export default Product;
