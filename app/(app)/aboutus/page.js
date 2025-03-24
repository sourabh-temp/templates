import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      <Header />
      <h3 className="text-lg mb-4">
        <Link href="/" className="text-blue-500 hover:underline">Home</Link> &gt;&gt; about
      </h3>
      <div className="px-10 max-w-4xl mx-auto font-sans leading-relaxed">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">About Us</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">Who We Are</h2>
          <p className="text-gray-600">
            Welcome to our website! We are a dedicated team of developers and designers passionate about solving coding problems and enhancing project development. Our mission is to empower developers and enthusiasts by providing high-quality code snippets, templates, and resources to streamline their projects.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">What We Offer</h2>
          <p className="text-gray-600 mb-4">
            Our website serves as a comprehensive platform where you can find solutions to common coding challenges. We provide:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li className="mb-2">Code snippets for various programming languages</li>
            <li className="mb-2">Website templates to jumpstart your projects</li>
            <li className="mb-2">Short templates tailored for specific use cases</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">Our Vision</h2>
          <p className="text-gray-600">
            We envision a community where developers can easily access resources to overcome challenges and innovate freely. Our goal is to continually update our offerings to meet the evolving needs of our users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">Join Us</h2>
          <p className="text-gray-600">
            Whether you&apos;re a beginner or an experienced developer, we invite you to explore our resources and join our community. Together, let&apos;s simplify coding and enhance creativity in web development.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
