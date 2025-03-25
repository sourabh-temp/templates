import React, { useState, useEffect } from 'react';
import '@/styles/admin/CategoryForm.css';

const CategoryForm = ({ onSubmit, onClose, editingCategory }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name); // Pre-fill the form for editing
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return; // Prevent submission if name is empty
    onSubmit({ id: editingCategory ? editingCategory.id : 0, name });
    setName(''); // Clear form after submission
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingCategory ? 'Edit Category' : 'Create Category'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
          />
          <div className="form-actions">
            <button type="submit">{editingCategory ? 'Save Changes' : 'Create Category'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
