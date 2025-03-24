"use client"
import React, { useState } from "react";
import "@/styles/QA.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const phpQuestions = [
  {
    id: 1,
    question: "What is PHP?",
    answer: "PHP (Hypertext Preprocessor) is a widely-used, open-source scripting language that is especially suited for web development. It can be embedded into HTML and is used to generate dynamic web pages."
  },
  {
    id: 2,
    question: "What is the difference between `echo` and `print` in PHP?",
    answer: "`echo` and `print` are both used to output data to the screen, but `echo` can take multiple parameters, whereas `print` can only take one. `echo` is faster than `print` and does not return any value, while `print` returns 1."
  },
  {
    id: 3,
    question: "What are PHP variables?",
    answer: "PHP variables are containers for storing data. They begin with a dollar sign (`$`) followed by the variable name. PHP variables are dynamically typed, meaning their data type is determined at runtime."
  },
  {
    id: 4,
    question: "What is the purpose of the `$_GET` and `$_POST` superglobals?",
    answer: "`$_GET` and `$_POST` are PHP superglobals used to collect form data. `$_GET` retrieves data from the URL query string, while `$_POST` retrieves data sent through HTTP POST requests. `$_POST` is more secure than `$_GET` for sending sensitive data."
  },
  {
    id: 5,
    question: "What are PHP arrays?",
    answer: "PHP arrays are variables that can store multiple values. Arrays can be indexed (numeric) or associative (key-value pairs). PHP supports multidimensional arrays, which can hold other arrays as elements."
  },
  {
    id: 6,
    question: "What is the difference between `include()` and `require()` in PHP?",
    answer: "`include()` and `require()` are used to include files in PHP. The main difference is that if a file is not found, `include()` will only produce a warning, whereas `require()` will cause a fatal error and stop the script execution."
  },
  {
    id: 7,
    question: "What is the difference between `==` and `===` in PHP?",
    answer: "`==` checks for equality of values, converting types if necessary (loose comparison). `===` checks for both equality of value and type (strict comparison)."
  },
  {
    id: 8,
    question: "What is a session in PHP?",
    answer: "A session in PHP is a way to store information (such as user data) to be used across multiple pages. Sessions are maintained using a unique session ID stored on the client side (in a cookie) and on the server side."
  },
  {
    id: 9,
    question: "What are cookies in PHP?",
    answer: "Cookies in PHP are small pieces of data stored on the user's browser that can be used to remember user preferences or track sessions. Cookies are set using the `setcookie()` function and can have an expiration time."
  },
  {
    id: 10,
    question: "What is object-oriented programming (OOP) in PHP?",
    answer: "Object-oriented programming in PHP involves using classes and objects to model real-world entities. PHP supports OOP features like inheritance, polymorphism, encapsulation, and abstraction to create reusable and modular code."
  },
  {
    id: 11,
    question: "What is the `$_SESSION` superglobal in PHP?",
    answer: "`$_SESSION` is a PHP superglobal array used to store session variables. These variables are stored on the server and are persistent across page reloads during a user's session."
  },
  {
    id: 12,
    question: "What is a constructor in PHP?",
    answer: "A constructor in PHP is a special method within a class that is automatically called when an object is instantiated. It is used to initialize object properties or perform other setup tasks."
  },
  {
    id: 13,
    question: "What is the `isset()` function in PHP?",
    answer: "`isset()` is a PHP function that checks if a variable is set and is not null. It returns `true` if the variable exists and has a value, otherwise it returns `false`."
  },
  {
    id: 14,
    question: "What is the `empty()` function in PHP?",
    answer: "`empty()` is a PHP function that checks if a variable is empty, meaning it is not set, is `null`, or has an empty value like an empty string or 0."
  },
  {
    id: 15,
    question: "What are exceptions in PHP?",
    answer: "Exceptions in PHP are a way to handle errors in a controlled manner. Using `try-catch` blocks, developers can catch and handle exceptions rather than relying on traditional error handling methods."
  },
  {
    id: 16,
    question: "What is the purpose of `header()` in PHP?",
    answer: "`header()` is used in PHP to send raw HTTP headers to the browser. It can be used to redirect pages, set cookies, or modify cache control settings before any output is sent to the browser."
  },
  {
    id: 17,
    question: "What are PDO (PHP Data Objects) in PHP?",
    answer: "PDO (PHP Data Objects) is a database access layer in PHP that provides a uniform method of access to multiple databases. It supports prepared statements and allows for secure data handling and database interactions."
  },
  {
    id: 18,
    question: "What is `implode()` and `explode()` in PHP?",
    answer: "`implode()` is used to join array elements into a string, while `explode()` is used to split a string into an array based on a delimiter."
  },
  {
    id: 19,
    question: "What is a PHP trait?",
    answer: "A PHP trait is a mechanism for code reuse in classes. Traits allow you to include methods from one or more classes in other classes, solving some of the limitations of multiple inheritance."
  },
  {
    id: 20,
    question: "What is the `file_get_contents()` function in PHP?",
    answer: "`file_get_contents()` is a PHP function that reads the entire contents of a file into a string. It can be used to read text files, HTML files, or other types of data."
  },
  {
    id: 21,
    question: "What is the `unserialize()` function in PHP?",
    answer: "`unserialize()` is a PHP function used to convert a serialized string back into a PHP value. It is often used to retrieve complex data structures from a database or a file."
  },
  {
    id: 22,
    question: "What is the `fopen()` function in PHP?",
    answer: "`fopen()` is a PHP function used to open a file or URL for reading or writing. It returns a file handle that can be used in subsequent file operations."
  },
  {
    id: 23,
    question: "What is the difference between `require` and `require_once` in PHP?",
    answer: "`require` is used to include a file and stop script execution if the file is not found. `require_once` works the same as `require`, but ensures the file is included only once during the script execution."
  },
  {
    id: 24,
    question: "What are namespaces in PHP?",
    answer: "Namespaces in PHP are used to organize classes, functions, and constants into logical groups to avoid name conflicts. They provide a way to encapsulate code and prevent collisions between identifiers."
  },
  {
    id: 25,
    question: "What is the difference between `==` and `===` in PHP?",
    answer: "`==` checks for equality of values, allowing type conversion (loose comparison), while `===` checks for both equality of value and type (strict comparison)."
  }
];


const Rubyqa = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (questionId) => {
    if (selectedQuestion === questionId) {
      setSelectedQuestion(null); // Toggle to close if already open
    } else {
      setSelectedQuestion(questionId); // Open new question
    }
  };

  return (
    <>
      <Header />
      <div className="ruby-qa-page">
        <Link href="/Practice">
          <button className="back-button">
            <FaArrowLeft />
          </button>
        </Link>
        <header className="qa-header">
          <h1>PHP Q&A</h1>
          <h3>Explore common PHP concepts and answers.</h3>
        </header>

        <div className="qa-list">
          {phpQuestions.map((q) => (
            <div key={q.id} className="qa-item">
              <div
                className={`qa-question ${selectedQuestion === q.id ? "active" : ""}`}
                onClick={() => handleQuestionClick(q.id)} // pass q.id directly
              >
                {q.question}
              </div>
              {selectedQuestion === q.id && (
                <div className="qa-answer">
                  <p>{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rubyqa;
