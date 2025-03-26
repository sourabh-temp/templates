"use client";
import React, { useState, useEffect, useCallback } from 'react';
import '@/styles/ProductModal.css';

const Modal = ({ productId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  // Fetch product data when modal is opened
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/template/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setHtmlCode(data?.templates.html_code || "");
        setCssCode(data?.templates.css_code || "");
        setJsCode(data?.templates.js_code || "");
      } catch (error) {
        console.error('Failed to fetch product data:', error); // Log the error instead of setting it
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent closing when clicking inside the modal content
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal if clicked outside the modal content
    }
  };

  const runCode = useCallback(() => {
    try {
      const previewFrame = document.getElementById("preview-frame")?.contentWindow?.document; 
      if (previewFrame) {
        previewFrame.open();
        previewFrame.write(`
          <html>
            <head>
              <style>${cssCode}</style>
            </head>
            <body>
              ${htmlCode}
              <script>${jsCode}</script>
            </body>
          </html>
        `);
        previewFrame.close();
      }
    } catch (error) {
      console.error("Error running code:", error);
    }
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    runCode(); // Run code whenever the HTML, CSS, or JS changes
  }, [htmlCode, cssCode, jsCode, runCode]);

  return (
    <div className="modal1" onClick={handleOutsideClick}>
      <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>X</button>
        <h1>Preview</h1>
        {loading && <p>Loading...</p>}
        <div className="content">
          <div className="previewContainer">
            <iframe id="preview-frame" className="laptop-preview" title="Preview" sandbox="allow-scripts allow-same-origin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
