"use client"
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger icon for mobile
import '@/styles/MenuBar.css';

const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu state
  
  const menuItems = [
    {
      title: 'Business & Services',
      submenus: [
        { name: 'Consulting', link: '/consulting' },
        { name: 'Marketing', link: '/marketing' },
        { name: 'Finance', link: '/finance' },
      ],
    },
    {
      title: 'Nav Bar Template',
      submenus: [
        { name: 'Electronics', link: '/electronics' },
        { name: 'Clothing', link: '/clothing' },
        { name: 'Home Goods', link: '/home-goods' },
      ],
    },
    {
      title: 'Creative',
      submenus: [
        { name: 'Design', link: '/design' },
        { name: 'Photography', link: '/photography' },
        { name: 'Video Production', link: '/video-production' },
      ],
    },
    {
      title: 'Resume',
      submenus: [
        { name: 'Resume Template', link: '/resume-template' },
      ],
    },
    {
      title: 'Interview',
      submenus: [
        { name: 'Tips', link: '/tips' },
        { name: 'Programming Questions', link: '/Program' },
        { name: 'Practice', link: '/Practice' },
      ],
    },
  ];

  return (
    <div className="menuBar">
      <div className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`menuList ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item, index) => (
          <li key={index} className="menuItem">
            <span className="menuTitle">{item.title}</span>
            <ul className="dropdown">
              {item.submenus.map((submenu, subIndex) => (
                <li key={subIndex}>
                  <Link href={submenu.link}>{submenu.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
