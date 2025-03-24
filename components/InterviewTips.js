"use client";

import React from 'react';
import Image from 'next/image';
import interviewTipsImage from '@/public/image/tips.png'; // Replace with your interview tips image
import codingPracticeImage from '@/public/image/practice.png'; // Replace with your coding practice image
import { useRouter } from 'next/navigation';
import '@/styles/InterviewPracticeSection.css'; // Import the regular CSS

const InterviewPracticeSection = () => {
  const router = useRouter();
  return (
    <div className="inter-container">
      {/* Interview Tips Row */}
      <div className="inter-row">
        <div className="image-wrapper">
          <Image
            src={interviewTipsImage}
            alt="Interview Tips"
            width={1000}
            height={1500}
            objectFit="cover"
          />
          <div className="image-gradient"></div>
        </div>
        <div className="text-wrapper" style={{marginTop: '56px',marginLeft: '46px'}}>
          <h2 className="title">
            Ace Your Interviews
          </h2>
          <p className="text">
            Prepare for success with our curated interview tips. We provide actionable advice to help you navigate common interview questions, showcase your strengths, and make a lasting impression on potential employers.
          </p>
          <button
            onClick={() => router.push('/tips')}
            className="button"
          >
            Interview Tips
          </button>
        </div>
      </div>

      <div className="inter-row">
        <div className="text-wrapper text-wrapper-left">
          <h2 className="title">
            Sharpen Your Coding Skills
          </h2>
          <p className="text">
            Enhance your coding proficiency with our comprehensive practice questions. Tackle real-world coding challenges and strengthen your problem-solving abilities. Prepare for technical interviews and improve your overall coding skills.
          </p>
          <button
            onClick={() => router.push('/Practice')}
            className="button button-green"
          >
            Coding Practice
          </button>
        </div>
        <div className="image-wrapper image-wrapper-right">
          <Image
            src={codingPracticeImage}
            alt="Coding Practice"
            width={1000}
            height={1000}
            objectFit="cover"
          />
          <div className="image-gradient"></div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticeSection;
