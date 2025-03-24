"use client";
import React, { useState, useEffect } from 'react';
import "@/styles/Category.css";
import Image from "next/image";
import kotlin from "@/public/image/field-6574455_640.jpg";
import Link from "next/link";
import ProductModal from '@/components/ProductModal';

const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const CategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://temp-rails-1.onrender.com/api/category');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
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

  const fetchTemplates = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://temp-rails-1.onrender.com/api/category-product?categoryid=${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data.templates) && data.templates.length > 0) {
        setProducts(data.templates);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (productId) => {
    setSelectedProductId(productId); // Set the product ID when opening the modal
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setSelectedProductId(null); // Clear selected product ID when closing modal
    setIsModalOpen(false); // Close modal
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category.id);
    fetchTemplates(category.id);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) {
      fetchTemplates(0);
    }
  }, [activeCategory]);

  return (
    <div>
      <div className="template-info">
        <h2>Welcome to Our Template Library!</h2>
        <p>
          At Your Company Name, we believe that building beautiful and functional websites should be quick and easy.
          Whether you are a seasoned developer or just starting, our extensive collection of pre-built templates allows you to create amazing pages without the hassle of designing from scratch.
        </p>
        <ul>
          <li><strong>Speed up your workflow, Customization made easy, Responsive & Modern, Variety of Categories </strong> </li>
        </ul>
        <ol>
          <li><strong>Browse Categories, Customize, Download & Use</strong></li>
        </ol>
        <p>Let’s get started! Select a category below to discover the template that’s right for you.</p>
        ▼
      </div>

      <div className="category-container">
        <div
          key="all"
          className={`category-item ${activeCategory === 0 ? 'active-category' : ''}`}
          onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
        >
          All designs
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${activeCategory === category.id ? 'active-category' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {capitalizeFirstLetter(category.name)}
          </div>
        ))}
      </div>

      <div className="product-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.length === 0 ? (
            <div>No Templates Available...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <Image src={kotlin} alt={product.name} width={150} height={150} layout="intrinsic" />
                  <h3 className="product-title">{product.name}</h3>
                  <div className="overlay">
                    <button aria-label={`View ${product.name}`} onClick={() => openModal(product.id)}>Preview</button>
                    <Link href={`/templates/${product.id}`}>
                      <button className="custmize" aria-label={`Edit ${product.name}`}>Customize</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      {isModalOpen && selectedProductId !== null && (
        <ProductModal
          productId={selectedProductId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CategoryList;
