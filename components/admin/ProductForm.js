"use client";
import React, { useState, useEffect } from 'react';
import '@/styles/admin/ProductForm.css';



function ProductForm({ onSubmit, onClose, editingProduct }) {
  const [product, setProduct] = useState(
    editingProduct || {
      id: 0,
      name: '',
      description: '',
      status: 'publish',
      html_code: '',
      css_code: '',
      javas_code: '',
      created_at: '',
      category_id: '',
      counter: 0,
    }
  );

  const [categories, setCategories] = useState([]); // Store categories
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://temp-rails-1.onrender.com/api/category');
        const data = await response.json();
        setCategories(data.categorys);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product); // On submit, send product with selected category
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingProduct ? 'Edit Product' : 'Create Product'}</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Template Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>HTML Code</label>
            <textarea
              name="html_code"
              value={product.html_code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CSS Code</label>
            <textarea
              name="css_code"
              value={product.css_code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>JavaScript Code</label>
            <textarea
              name="javas_code"
              value={product.javas_code}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={product.status} onChange={handleInputChange}>
              <option value="publish">Publish</option>
              <option value="unpublish">Unpublish</option>
            </select>
          </div>

          {/* Category Select Input */}
          <div className="form-group">
            <label>Category</label>
            {loadingCategories ? (
              <p>Loading categories...</p>
            ) : (
              <select
                name="category_id"
                value={product.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-primary">{editingProduct ? 'Update Product' : 'Create Product'}</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
