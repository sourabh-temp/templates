"use client";
import React from 'react';
import Image from 'next/image';
import codeTemplate1 from '@/public/image/field-6574455_640.jpg';
import codeTemplate2 from '@/public/image/field-6574455_640.jpg';
import { useRouter } from 'next/navigation';
import '@/styles/TemplateHomeView.css';

const TemplateHomeView = () => {
  const router = useRouter();
  
  return (
    <div className="template-view-section"> {/* Applying the external styles */}
      <div className="content-section">
        <h2>Unlock the Power of Robust Code Templates</h2>
        <p>
          Discover a seamless development experience with our comprehensive collection of robust and user friendly code templates. We have designed these templates to streamline complex coding tasks, enabling you to build efficient and reliable applications with ease.
        </p>
        <p>
          Gain instant access to a diverse range of high quality templates, seamlessly integrate them into your projects with a simple copy-paste, and customize them to perfectly match your specific project requirements. Explore templates tailored for various programming languages and frameworks, all in one place.
        </p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button 
            onClick={() => router.push('/templates')}
            className="button button-blue"
          >
            Explore Templates
          </button>
          <button 
            onClick={() => router.push('/templates')}
            className="button button-green"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="image-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[-50px]">
          {/* Image 1 */}
          <div className="md:w-1/2 p-6 md:p-10 flex justify-center aspect-w-1 aspect-h-1">
            <div className="image-wrapper">
              <div className="rounded-2xl shadow-2xl transform rotate-[10deg] overflow-hidden" >
                <Image
                  src={codeTemplate1}
                  alt="Code Template 1"
                  width={1000}
                  height={1500}
                  layout="intrinsic" // Correct layout
                  objectFit="cover" // Ensure cover works with layout
                />
                <div className="image-gradient"></div>
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="md:w-1/2 p-6 md:p-10 flex justify-center aspect-w-1 aspect-h-1">
            <div className="image-wrapper reverse">
              <div className="rounded-2xl shadow-2xl transform rotate-[-10deg] overflow-hidden" style={{ marginTop: '-120px' }} >
                <Image
                  src={codeTemplate2}
                  alt="Code Template 2"
                  width={1000}
                  height={1500}
                  layout="intrinsic" // Correct layout
                  objectFit="cover" // Ensure cover works with layout
                />
                <div className="image-gradient"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateHomeView;
