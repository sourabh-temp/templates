"use client";
import { useState } from 'react';
import '@/styles/ResumeForm.css';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import config from '@/components/config';

const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    image: null,
    dateOfBirth: '',
  });

  const [education, setEducation] = useState([
    { level: 'class 10th', board: '', passing_year: '', percentage: '' },
    { level: 'class 12th', board: '', passing_year: '', percentage: '' },
  ]);

  const [collegeEducation, setCollegeEducation] = useState([
    { college_name: '', course_name: '', passing_year: '', percentage: '' },
  ]);

  const [experienceDetails, setExperienceDetails] = useState([
    { company_name: '', job_title: '', start_date: '', end_date: '', currently_working: false },
  ]);

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const [isExperienced, setIsExperienced] = useState(false);

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;

    if (section === 'personalInfo') {
      setPersonalInfo({ ...personalInfo, [name]: value });
    } else if (section === 'education') {
      const updatedEducation = [...education];
      updatedEducation[index][name] = value;
      setEducation(updatedEducation);
    } else if (section === 'experience') {
      const updatedExperience = [...experienceDetails];
      updatedExperience[index][name] = value;
      setExperienceDetails(updatedExperience);
    } else if (section === 'collegeEducation') {
      const updatedCollegeEducation = [...collegeEducation];
      updatedCollegeEducation[index][name] = value;
      setCollegeEducation(updatedCollegeEducation);
    } else if (section === 'skills') {
      setNewSkill(value);
    }
  };

  const handleImageChange = (e) => {
    setPersonalInfo({ ...personalInfo, image: e.target.files[0] });
  };

  const addMoreEducation = () => {
    setEducation([
      ...education,
      { level: '', board: '', passing_year: '', percentage: '' },
    ]);
  };

  const removeEducationColumn = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const addMoreCollegeEducation = () => {
    setCollegeEducation([
      ...collegeEducation,
      { college_name: '', course_name: '', passing_year: '', percentage: '' },
    ]);
  };

  const removeCollegeEducation = (index) => {
    const updatedCollegeEducation = [...collegeEducation];
    updatedCollegeEducation.splice(index, 1);
    setCollegeEducation(updatedCollegeEducation);
  };

  const addMoreExperience = () => {
    setExperienceDetails([
      ...experienceDetails,
      { company_name: '', job_title: '', start_date: '', end_date: '', currently_working: false },
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperience = [...experienceDetails];
    updatedExperience.splice(index, 1);
    setExperienceDetails(updatedExperience);
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleCurrentlyWorkingChange = (index) => {
    const updatedExperience = [...experienceDetails];
    updatedExperience[index].currently_working = !updatedExperience[index].currently_working;
    setExperienceDetails(updatedExperience);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!personalInfo.name || !personalInfo.email) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', personalInfo.name);
    formData.append('phone_number', personalInfo.phoneNumber);
    formData.append('email', personalInfo.email);
    formData.append('date_of_birth', personalInfo.dateOfBirth);
    if (personalInfo.image) formData.append('image', personalInfo.image);

    education.forEach((edu, index) => {
      formData.append(`education[${index}][level]`, edu.level);
      formData.append(`education[${index}][board]`, edu.board);
      formData.append(`education[${index}][passing_year]`, edu.passing_year);
      formData.append(`education[${index}][percentage]`, edu.percentage);
    });

    collegeEducation.forEach((edu, index) => {
      formData.append(`college_education[${index}][college_name]`, edu.college_name);
      formData.append(`college_education[${index}][course_name]`, edu.course_name);
      formData.append(`college_education[${index}][passing_year]`, edu.passing_year);
      formData.append(`college_education[${index}][percentage]`, edu.percentage);
    });

    experienceDetails.forEach((exp, index) => {
      formData.append(`experience_details[${index}][company_name]`, exp.company_name);
      formData.append(`experience_details[${index}][job_title]`, exp.job_title);
      formData.append(`experience_details[${index}][start_date]`, exp.start_date);
      formData.append(`experience_details[${index}][end_date]`, exp.end_date);
      formData.append(`experience_details[${index}][currently_working]`, exp.currently_working);
    });

    skills.forEach((skill) => {
      formData.append('skills[]', skill);
    });

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/resumes`, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        alert('Resume submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Failed to submit resume. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="section">
            <h2>Personal Information</h2>
            <div className="personalInfo">
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={(e) => handleInputChange(e, 'personalInfo')}
                placeholder="Name"
              />
              <input
                type="tel"
                name="phoneNumber"
                value={personalInfo.phoneNumber}
                onChange={(e) => handleInputChange(e, 'personalInfo')}
                placeholder="Phone Number"
              />
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange(e, 'personalInfo')}
                placeholder="Email"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={personalInfo.dateOfBirth}
                onChange={(e) => handleInputChange(e, 'personalInfo')}
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-row">
                {edu.level}
                <input
                  type="text"
                  name="board"
                  value={edu.board}
                  onChange={(e) => handleInputChange(e, 'education', index)}
                  placeholder="Board"
                />
                <input
                  type="number"
                  name="passing_year"
                  value={edu.passing_year}
                  onChange={(e) => handleInputChange(e, 'education', index)}
                  placeholder="Passing Year"
                />
                <input
                  type="number"
                  name="percentage"
                  value={edu.percentage}
                  onChange={(e) => handleInputChange(e, 'education', index)}
                  placeholder="Percentage"
                />
                {index > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeEducationColumn(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMoreEducation}>
              Add More Education
            </button>
          </div>
        );
      case 3:
        return (
          <div className="section">
            <h2>College Education</h2>
            {collegeEducation.map((edu, index) => (
              <div key={index} className="education-row">
                <input
                  type="text"
                  name="college_name"
                  value={edu.college_name}
                  onChange={(e) => handleInputChange(e, 'collegeEducation', index)}
                  placeholder="College Name"
                />
                <input
                  type="text"
                  name="course_name"
                  value={edu.course_name}
                  onChange={(e) => handleInputChange(e, 'collegeEducation', index)}
                  placeholder="Course Name"
                />
                <input
                  type="number"
                  name="passing_year"
                  value={edu.passing_year}
                  onChange={(e) => handleInputChange(e, 'collegeEducation', index)}
                  placeholder="Passing Year"
                />
                <input
                  type="number"
                  name="percentage"
                  value={edu.percentage}
                  onChange={(e) => handleInputChange(e, 'collegeEducation', index)}
                  placeholder="Percentage"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeCollegeEducation(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMoreCollegeEducation}>
              Add More College Education
            </button>
          </div>
        );
      case 4:
        return (
          <div className="section">
            <h2>Work Experience</h2>
            <label>Are you Fresher?</label>
            <input
              type="checkbox"
              checked={!isExperienced}
              onChange={() => setIsExperienced(false)}
            />
            <label>Are you experienced?</label>
            <input
              type="checkbox"
              checked={isExperienced}
              onChange={() => setIsExperienced(true)}
            />
            {isExperienced && (
              <div>
                {experienceDetails.map((exp, index) => (
                  <div key={index} className="experience-row">
                    <input
                      type="text"
                      name="companyName"
                      value={exp.company_name}
                      onChange={(e) => handleInputChange(e, 'experience', index)}
                      placeholder="Company Name"
                    />
                    <input
                      type="text"
                      name="job_title"
                      value={exp.job_title}
                      onChange={(e) => handleInputChange(e, 'experience', index)}
                      placeholder="Job Title"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={exp.start_date}
                      onChange={(e) => handleInputChange(e, 'experience', index)}
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={exp.end_date}
                      onChange={(e) => handleInputChange(e, 'experience', index)}
                      placeholder="End Date"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeExperience(index)}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addMoreExperience}>
                  Add More Experience
                </button>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="section">
            <h2>Skills</h2>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => handleInputChange(e, 'skills')}
              placeholder="Add a skill"
            />
            <button type="button" onClick={addSkill}>
              Add Skill
            </button>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>
                  {skill} <button onClick={() => removeSkill(skill)}>x</button>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
  <>
    <Header />
    <div className="resume-form-container">
      <h1>Create Your Resume</h1>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="navigation-buttons">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </button>
          {currentStep === totalSteps ? (
            <button type="submit">Submit Resume</button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
    <Footer />
  </>
  );
};

export default ResumeForm;
