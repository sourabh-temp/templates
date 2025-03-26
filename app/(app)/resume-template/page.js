"use client";
import { useState } from "react";
import Image from "next/image"; 
import kotlin from "@/public/image/resume.avif";
import temp from "@/public/image/temp.png";
import final from "@/public/image/final.png";
import form from "@/public/image/form.png";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import '@/styles/ResumeTemplateList.css'

const steps = [
  {
    id: 1,
    icon: temp,
    title: "STEP 1",
    description: "Start by choosing a template that suits your style and profession. Pick something that makes your resume stand out!",
    bgColor: "step-bg-green",
  },
  {
    id: 2,
    icon: form,
    title: "STEP 2",
    description: "Now it's time to add your personal details. Include your work experience, skills, education, and contact information.",
    bgColor: "step-bg-blue",
  },
  {
    id: 3,
    icon: final,
    title: "STEP 3",
    description: "Add the finishing touches to your resume, ensuring it’s well-formatted and free of errors. Get ready to impress employers!",
    bgColor: "step-bg-yellow",
  },
];

const resumeTemplates = [
  { id: 1, image: kotlin, name: "Modern Resume" },
  { id: 2, image: kotlin, name: "Professional Resume" },
  { id: 3, image: kotlin, name: "Simple Resume" },
  { id: 4, image: kotlin, name: "Creative Resume" },
  { id: 5, image: kotlin, name: "Minimal Resume" },
  { id: 6, image: kotlin, name: "Elegant Resume" },
  { id: 7, image: kotlin, name: "Elegant Resume" },
  { id: 8, image: kotlin, name: "Elegant Resume" },
];

export default function ResumePage() {
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const router = useRouter();

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleContinue = () => {
    setShowTemplates(true);
  };

  return (
    <>
      <Header />
      <div className="resume-page-container">
        {!showTemplates ? (
          // Step Guide Section
          <div className="step-guide-card">
            <h2 className="step-guide-title">Here’s what you need to know</h2>
            <div className="step-list">
              {steps.map((step) => (
                <div key={step.id} className="step-item">
                  <div className={`step-icon-container ${step.bgColor}`}>
                    <Image src={step.icon} alt={step.title} width={350} height={350} />
                  </div>
                  <div className="step-text">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleContinue}
              className="continue-btn"
            >
              Continue
            </button>
          </div>
        ) : (
          <div>
            <h1 className="choose-template-title">
              Choose Your Resume Template
            </h1>
            <div className="template-grid">
              {resumeTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate?.id === template.id ? "template-selected" : ""}`}
                  onClick={() => handleTemplateClick(template)}
                >
                  <div
                    className={`template-image-container ${selectedTemplate?.id === template.id ? "template-shadow-selected" : ""}`}
                  >
                    <Image
                      src={template.image}
                      alt={template.name}
                      width={500}
                      height={600}
                      className="template-image"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="footer-btns">
              <button
                className="skip-btn"
                onClick={() => setSelectedTemplate(null)}
              >
                Skip for now
              </button>

              <button
                className={`use-template-btn ${selectedTemplate ? "" : "disabled"}`}
                onClick={() => router.push(`/build-resume?templateId=${selectedTemplate?.id}`)}
                disabled={!selectedTemplate}
              >
                Use Template
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
