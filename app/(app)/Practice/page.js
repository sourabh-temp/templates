"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/styles/Practice.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'


// Import images for languages
import ruby from "@/public/image/ruby.png";
import js from "@/public/image/js.svg";  
import python from "@/public/image/python.png";
import cpp from "@/public/image/cpp.webp";
import java from "@/public/image/java.svg";
import go from "@/public/image/go.png";
import react from "@/public/image/react.png";
import rust from "@/public/image/rust.png";
import swift from "@/public/image/swift.png";
import php from "@/public/image/php.svg";
import kotlin from "@/public/image/kotline.png";

const languages = [
  { id: 1, name: "Ruby & Rails", icon: ruby, link: "/RubyQA" },
  { id: 2, name: "JavaScript", icon: js, link: "/JavaScriptQA" },
  { id: 3, name: "Python", icon: python, link: "/PythonQA" },
  { id: 4, name: "C++", icon: cpp, link: "/CppQA" },
  { id: 5, name: "Java", icon: java, link: "/JavaQA" },
  { id: 6, name: "Go", icon: go, link: "/GoQA" },
  { id: 7, name: "Rust", icon: rust, link: "/RustQA" },
  { id: 8, name: "Swift", icon: swift, link: "/Swift" },
  { id: 9, name: "PHP", icon: php, link: "/PHPQA" },
  { id: 10, name: "Kotlin", icon: kotlin, link: "/KotlinQA" },
  { id: 11, name: "React", icon: react, link: "/ReactQA" },
];

const LanguagePage = () => {

  return (
    <>
      <Header />
      <div className="language-page">
        <header className="page-header">
          <h1>Choose a Programming Language to Practice</h1>
          <h3>Pick a language below and start practicing!</h3>
        </header>

        <div className="language-list">
          {languages.map((language) => (
            <Link key={language.id} href={language.link}>
              <div className="language-card">
                <div className="language-icon">
                  {/* Render image based on the icon property */}
                  <Image src={language.icon} alt={language.name} width={50} height={50} />
                </div>
                <p>{language.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LanguagePage;
