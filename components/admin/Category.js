"use client";
import React, { useState, useEffect } from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import '@/styles/admin/Category.css';

function Category() {
  const [categories, setCategories] = useState([]); // Removed TypeScript type annotation
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Removed TypeScript type annotation
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://temp-rails-1.onrender.com/api/category');
      const data = await response.json();
      if (Array.isArray(data.categorys) && data.categorys.length > 0) {
        setCategories(data.categorys);
      } else {
        console.error('Fetched data is not an array');
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on name
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openForm = (category = null) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://temp-rails-1.onrender.com/api/category/${id}`, { method: 'DELETE' });
      setCategories(categories.filter(category => category.id !== id));
      setPopupMessage('Category deleted successfully.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error('Error deleting category:', error);
      setPopupMessage('Error deleting category.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleCreateOrUpdateCategory = async (category) => {
    if (editingCategory) {
      // Update category
      try {
        await fetch(`https://temp-rails-1.onrender.com/api/category/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category),
        });
        setCategories(categories.map(c => c.id === category.id ? category : c));
        setPopupMessage('Category updated successfully.');
      } catch (error) {
        console.error('Error updating category:', error);
        setPopupMessage('Error updating category.');
      }
    } else {
      // Create category
      try {
        await fetch('https://temp-rails-1.onrender.com/api/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(category),
        });
        setCategories([...categories, { ...category, id: categories.length + 1 }]);
        setPopupMessage('Category created successfully.');
      } catch (error) {
        console.error('Error creating category:', error);
        setPopupMessage('Error creating category.');
      }
    }
    closeForm();
    setShowPopup(true);
    fetchCategories();
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="content">
      <h2>Category Management</h2>

      <div className="category-controls">
        {/* Search by name */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button onClick={() => openForm()} className="create-category">Create Category</button>
      </div>
      
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="loader-cell">
                <div className="loader"></div> {/* Show loader only in the table body */}
              </td>
            </tr>
          ) : filteredCategories.length === 0 ? (
            <tr>
              <td colSpan={2} className="error-message">
                No Record found
              </td>
            </tr>
          ) : (
            filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => openForm(category)} className="edit-button">Edit</button>
                  <button
                    onClick={() => category.id && handleDelete(category.id)} // Ensure the ID is valid
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
        <CategoryForm
          onClose={closeForm}
          onSubmit={handleCreateOrUpdateCategory}
          editingCategory={editingCategory}
        />
      )}

      {showPopup && <div className="popup">{popupMessage}</div>}
    </div>
  );
}

export default Category;
