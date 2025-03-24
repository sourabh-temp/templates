"use client"
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuBar from '@/components/MenuBar';
import ResumeTemplate from '@/components/ResumeTemplate';
import InterviewTips from '@/components/InterviewTips';
import Testimonials from '@/components/Testimonials';
import CodeSanp from '@/components/Codesnap';
import TemplateView from '@/components/TemplateView';
import { useRouter } from 'next/navigation';  // Correct import for Next.js 13 App Directory

const Home = () => {
  const router = useRouter();

  const sectionStyles = {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #fff, #bc5ae6)',
    color: '#fff',
    borderRadius: '0px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const headingStyles = {
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: '1.2',
    marginBottom: '20px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  };

  const paragraphStyles = {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '0 auto',
    marginBottom: '30px',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  };

  const buttonStyles = {
    padding: '15px 30px',
    fontSize: '16px',
    backgroundColor: '#ff6347',
    border: 'none',
    borderRadius: '50px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  };

  const appContainerStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  };

  const mainContentStyles = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9', 
  };

  return (
    <div style={appContainerStyles}>
      <Header />

      {/* Hero Section */}
      <section style={sectionStyles}>
        <h1 style={headingStyles}>
          <span style={{ color: '#bc5ae6' }}>Welcome</span> to Your Ultimate Template Hub
        </h1>
        <p style={paragraphStyles}>
          <span style={{ color: '#bc5ae6' }}>Discover the best coding templates</span>, interview challenges, and expert tips designed to elevate your career. Start building, learning, and excelling today!
        </p>
        <div style={{ textAlign: 'center' }}>
          <button
            style={buttonStyles}
            onClick={() => router.push('/templates')}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff4500'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff6347'}
          >
            Get Started
          </button>
        </div>
      </section>

      <main style={mainContentStyles}>
        <MenuBar />

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '20px', 
            fontWeight: '800', 
            lineHeight: '1.2', 
            textAlign: 'center',
            marginTop: '20px', 
            marginBottom: '20px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          }}>
          </h2>
        </section>
        <section style={{ marginBottom: '40px' }}>
          <TemplateView />
        </section>
        
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '20px', 
            fontWeight: '800', 
            lineHeight: '1.2', 
            textAlign: 'center', 
            marginBottom: '20px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          }}>
          </h2>
          <ResumeTemplate />
        </section>
        <section style={{ marginBottom: '40px' }}>
          <CodeSanp />
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '20px', 
            fontWeight: '800', 
            lineHeight: '1.5', 
            textAlign: 'center', 
            marginBottom: '20px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          }}>
          </h2>
          <InterviewTips />
        </section>

        {/* Testimonials Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '20px', 
            fontWeight: '800', 
            lineHeight: '1.2', 
            textAlign: 'center', 
            marginBottom: '20px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          }}>
          What Our Users Say
          </h2>
          <Testimonials />
        </section>

        {/* Call to Action */}
        <section style={{ backgroundColor: '#f1c40f', padding: '40px 20px', color: '#fff' }}>
          <h2>Ready to get started?</h2>
          <p>Start exploring our templates and ace your interviews today!</p>
          <button 
            style={{ padding: '15px 30px', fontSize: '16px', backgroundColor: '#e67e22', border: 'none', color: 'white', cursor: 'pointer', marginBottom: '40px' }}
          >
            Get Started
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
