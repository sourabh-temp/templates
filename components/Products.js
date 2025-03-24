"use client"
import React, { useState, useEffect } from 'react';
import '@/styles/Product.css';
import Image from "next/image";
import kotlin from "@/public/image/field-6574455_640.jpg";
import Link from 'next/link';
import ProductModal from '@/components/ProductModal';

const Loader = () => (
  <div className="loader">
    <div className="spinner"></div>
  </div>
);

interface ProductType {
  id: number;
  name: string;
  status: 'publish' | 'unpublish';
  description: string;
  html_code: string;
  css_code: string;
  createdAt: string;
  javas_code: number;
}


const ProductList = () => {
  const [sortOption, setSortOption] = useState('Recommended');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const fetchTemplates = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://temp-rails-1.onrender.com/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data.templates) && data.templates.length > 0) {
        setProducts(data.templates);
      } else {
        console.error('Fetched data is not an array');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsMenuOpen(false); // Close the menu after selection
  };

  const openModal = (productId: number) => {
    setSelectedProductId(productId); // Set the product ID when opening the modal
    setIsModalOpen(true); // Open modal
    // document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setSelectedProductId(null); // Clear selected product ID when closing modal
    setIsModalOpen(false); // Close modal
    // document.body.classList.remove('modal-open');
  };

  return (
    <div className="product-container">
      <div className="pro-header">
        <h2 className="results-title">Results found for: ‘Technology Company’</h2>
        <div className="sort-container">
          <span className="sort-label">Sort by:</span>
          <div 
            className="sort-menu" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            {sortOption} ▼
          </div>
          {isMenuOpen && (
            <div className="dropdown-menu" role="menu">
              <span onClick={() => handleSortChange('Recommended')} role="menuitem">Recommended</span>
              <span onClick={() => handleSortChange('Latest')} role="menuitem">Latest</span>
              <span onClick={() => handleSortChange('Top')} role="menuitem">Top</span>
            </div>
          )}
        </div>
      </div>

      {/* Show loader if loading is true */}
      {loading ? (
        <Loader />
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Image src={kotlin} alt={product.name} width={150} height={150} layout="intrinsic" />
              <h3 className="product-title">{product.name}</h3>
              <div className="overlay">
                <button aria-label={`View ${product.name}`} onClick={() => openModal(product.id)}>Preview</button>
                <Link href={`/template/${product.id}`}>
                  <button className="custmize" aria-label={`Edit ${product.name}`}>Customize</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for preview */}
      {isModalOpen && selectedProductId !== null && (
        <ProductModal
          productId={selectedProductId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ProductList;
