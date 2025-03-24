"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import resumeImage from '@/public/image/codesnap.png'; // Replace with your image path
import { useRouter } from 'next/navigation';
import '@/styles/Codesnap.css';

const ResumeCodeSnippet = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const codeSnippet = `
  #include <iostream>

  int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
  }
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="snap-container">
      {/* Image Background */}
      <div className="image-background">
        <div className="relative w-full h-full transform rotate-12">
          <Image
            src={resumeImage}
            alt="Background Resume"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="snap-content-section">
        {/* Content Side (Left) */}
        <div className="left-side">
          <h2>Code Faster, Learn Quicker: Practice with Ready-to-Use Snippets</h2>
          <p>
            Boost your coding efficiency with our library of practical code snippets. Designed for immediate use, these examples allow you to focus on learning and application. Simply copy, paste, and compile to see results instantly.
          </p>
          <ul>
            <li>Time-saving, ready-to-use coding examples</li>
            <li>Easy integration into your projects for quick testing</li>
            <li>Concise snippets to illustrate specific functionalities</li>
            <li>Directly copy for seamless practice and experimentation</li>
          </ul>
          <div className="flex gap-4 justify-center md:justify-start">
            <button onClick={() => router.push('/resume')} className="button button-blue">
              Get Started
            </button>
            <button onClick={() => router.push('/resume')} className="button button-green">
              Explore more
            </button>
          </div>
        </div>

        {/* Code Snippet Section (Right) */}
        <div className="right-side">
          <div className="code-snippet">
            <div className="snap-header">
              <h2>Code Snippet</h2>
              <button
                onClick={handleCopy}
                className={`button ${copied ? 'copied' : ''}`}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre>
              <code>{codeSnippet}</code>
            </pre>
            <div className="footer">
              <p>Copy the code snippet above and paste it into your preferred C++ compiler to see it in action.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCodeSnippet;
