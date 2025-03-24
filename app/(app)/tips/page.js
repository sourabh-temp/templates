"use client"
import React from 'react';

const InterviewTips = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-lg">
      <div className="border-b pb-4 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Interview Preparation Guide</h1>
        <p className="text-gray-500 mt-2">Essential steps & tips to ace your next interview</p>
      </div>
      <div className="space-y-6">
        {[
          {
            title: "Research the Company",
            description:
              "Understand their mission, values, and recent developments. This will help you tailor your answers and show genuine interest.",
          },
          {
            title: "Understand the Job Description",
            description:
              "Analyze the key responsibilities and required skills. Be ready to showcase your experience that aligns with the role.",
          },
		      {
					  title: "Build Your Resume",
					  description: (
					    <div>
					      <p>
					        An effective resume is your key to catching the attention of hiring managers. Here are some tips to help you build a strong resume that stands out:
					      </p>
					      <ul className="list-disc ml-6 mt-2 text-gray-600">
					        <li><strong>Use a clean and professional format:</strong> Choose a simple, clean design. Avoid cluttered layouts, use clear headings, and maintain consistent formatting throughout.</li>
					        <li><strong>Tailor your resume to the job:</strong> Highlight your relevant skills and experience based on the job description. Customize your resume to align with the specific role you’re applying for.</li>
					        <li><strong>Include a strong summary:</strong> Start with a brief but impactful summary of your skills and experience. Focus on your most impressive achievements and what you can bring to the role.</li>
					        <li><strong>Showcase relevant experience:</strong> List your professional experiences in reverse chronological order, including your achievements, responsibilities, and skills gained in each role.</li>
					        <li><strong>Highlight measurable accomplishments:</strong> Whenever possible, include quantifiable results (e.g., “Increased sales by 30%” or “Managed a team of 10+ people”). This makes your contributions concrete and valuable.</li>
					        <li><strong>Include skills and certifications:</strong> Don’t forget to include technical and soft skills that are important for the role. Additionally, list any certifications or courses relevant to the job.</li>
					        <li><strong>Proofread:</strong> Ensure that your resume is free from spelling or grammatical errors. Mistakes can hurt your chances, so take the time to review it carefully.</li>
					        <li><strong>Keep it concise:</strong> Limit your resume to 1–2 pages, focusing on your most relevant and recent experience. Avoid overloading it with unnecessary details.</li>
					      </ul>
					      <p className="mt-2">
					        A great resume is all about presenting yourself as a great fit for the role. Keep these tips in mind to maximize your chances of landing that interview.
					      </p>
					      <p className="mt-2">
					        Ready to create your resume? 
					        <a 
					          href="/create-resume" 
					          className="text-blue-500 underline hover:text-blue-700"
					        >
					          Start building your resume now!
					        </a>
					      </p>
					    </div>
					  ),
					},
          {
            title: "Practice Common Questions",
            description:
              "Prepare answers for common interview questions. Use the STAR method (Situation, Task, Action, Result) for structured responses.",
          },
          {
            title: "Dress Professionally",
            description:
              "Dress appropriately based on company culture. It's always better to be slightly overdressed than too casual.",
          },
          {
            title: "Arrive on Time",
            description:
              "Plan to arrive at least 10-15 minutes early. Test your route beforehand if it’s an in-person interview.",
          },
          {
            title: "Be Confident & Authentic",
            description:
              "Stay calm, be yourself, and showcase enthusiasm. Confidence makes a strong impression on the interviewer.",
          },
          {
            title: "Follow Up",
            description:
              "Send a thank-you email after the interview, reiterating your interest and appreciation for the opportunity.",
          },
        ].map((step, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Create Your Resume
        </button>
      </div>
    </div>
  );
}

export default InterviewTips;