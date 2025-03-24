"use client";

import React, { useState, useEffect } from 'react';

const dummySuggestions = [
  'Template 1',
  'Template 2',
  'Template 3',
  'Template 4',
  'Template 5',
];

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Add isVisible state

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Set isVisible to true when isOpen is true
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      setSuggestions(
        dummySuggestions.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setSuggestions([]);
    onClose();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`w-full max-w-md mx-auto p-5 bg-white shadow-xl rounded-lg relative z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100 animate-slide-down' : 'opacity-0'
      }`}
    >
      <button
        className="absolute top-2 right-2 bg-none border-none text-2xl cursor-pointer text-gray-800 transition-colors duration-300 hover:text-red-500"
        onClick={onClose}
      >
        ✖
      </button>
      <h2 className="text-2xl text-gray-800 font-semibold text-center mb-3 tracking-tight">
        Pick Your Favorite Template
      </h2>
      <form onSubmit={handleSubmit} className="flex items-center justify-between">
        <input
          type="text"
          className="w-4/5 p-3 border border-gray-300 rounded-md bg-gray-50 shadow-sm text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 m-2"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md text-base transition-colors duration-300 w-1/5 hover:from-blue-600 hover:to-blue-700"
        >
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-md max-h-52 overflow-y-auto z-50 list-none p-0 m-0 animate-slide-down">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer text-base transition-colors duration-300 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
