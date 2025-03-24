"use client";
import React from 'react';
import Image from 'next/image';
import resumeImage from '@/public/image/rsumetemp.png'; // Replace with your image path
import { useRouter } from 'next/navigation';
import '@/styles/ResumeTemplate.css';

const ResumeTemplate = () => {
  const router = useRouter();

  return (
    <div className="resume-content-section"> 
      {/* Content Side (Left) */}
      <div className="left-side">
        <h2>Craft Your Professional Resume</h2>
        <p>
          Elevate your career prospects with a compelling resume that showcases your unique skills and experiences. Our intuitive platform empowers you to create a standout resume that captures the attention of discerning employers.
        </p>
        <ul>
          <li>Sleek, modern template selection</li>
          <li>Effortless customization for your professional profile</li>
          <li>Advanced formatting options for impactful presentation</li>
          <li>Seamless download in industry-standard formats</li>
        </ul>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button
            onClick={() => router.push('/resume')}
            className="button button-blue"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/resume')}
            className="button button-green"
          >
            View Templates
          </button>
        </div>
      </div>

      {/* Image Side (Right) */}
      <div className="right-side">
        <div className="image-wrapper">
          <Image
            src={resumeImage}
            alt="Example Resume"
            width={1000}
            height={1500}
            objectFit="cover"
          />
          <div className="image-gradient"></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
