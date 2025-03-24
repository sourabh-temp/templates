"use client"
import React, { useState } from "react";
import "@/styles/QA.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const javascriptQuestions = [
  {
    id: 1,
    question: "What is JavaScript?",
    answer: "JavaScript is a high-level, interpreted programming language that enables interactivity and dynamic behavior in web browsers. It is one of the core technologies of web development, alongside HTML and CSS."
  },
  {
    id: 2,
    question: "What is the difference between `var`, `let`, and `const` in JavaScript?",
    answer: "`var` is function-scoped and can be re-assigned, `let` is block-scoped and can be re-assigned, while `const` is block-scoped and cannot be re-assigned once initialized."
  },
  {
    id: 3,
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that remembers its lexical scope even when the function is executed outside that scope. This allows functions to retain access to variables from the outer scope."
  },
  {
    id: 4,
    question: "What are callbacks in JavaScript?",
    answer: "A callback is a function passed into another function as an argument to be executed later. It is commonly used in asynchronous operations, like handling the result of a network request."
  },
  {
    id: 5,
    question: "What is the difference between `null` and `undefined` in JavaScript?",
    answer: "`null` is an assignment value representing the intentional absence of any object value, whereas `undefined` means a variable has been declared but has not yet been assigned a value."
  },
  {
    id: 6,
    question: "What is the `this` keyword in JavaScript?",
    answer: "`this` refers to the context in which a function is executed. It points to the object that is currently invoking the function, which can vary depending on how the function is called."
  },
  {
    id: 7,
    question: "What is a promise in JavaScript?",
    answer: "A promise is an object representing the eventual completion (or failure) of an asynchronous operation. It allows you to handle asynchronous operations in a more readable manner using `.then()` or `async/await`."
  },
  {
    id: 8,
    question: "What is the event loop in JavaScript?",
    answer: "The event loop is a mechanism in JavaScript that handles asynchronous operations. It continually checks the call stack and the message queue, executing any tasks in the queue once the stack is empty."
  },
  {
    id: 9,
    question: "What are arrow functions in JavaScript?",
    answer: "Arrow functions are a shorter syntax for writing functions. They do not have their own `this`, so they inherit `this` from the enclosing lexical context."
  },
  {
    id: 10,
    question: "What is hoisting in JavaScript?",
    answer: "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during compilation. However, only the declarations are hoisted, not the initializations."
  },
  {
    id: 11,
    question: "What is a JavaScript prototype?",
    answer: "Every JavaScript object has a prototype. A prototype is another object from which the original object inherits properties and methods. Prototypes allow for inheritance in JavaScript."
  },
  {
    id: 12,
    question: "What is the difference between synchronous and asynchronous programming?",
    answer: "Synchronous programming executes tasks in sequence, blocking the next task until the current one is completed. Asynchronous programming allows tasks to be executed independently, without blocking the execution of other tasks."
  },
  {
    id: 13,
    question: "What is destructuring in JavaScript?",
    answer: "Destructuring is a feature that allows you to unpack values from arrays or properties from objects into distinct variables in a concise manner."
  },
  {
    id: 14,
    question: "What is the spread operator in JavaScript?",
    answer: "The spread operator (`...`) allows you to expand or spread iterables (like arrays or objects) into individual elements or properties. It's commonly used in array and object manipulations."
  },
  {
    id: 15,
    question: "What are template literals in JavaScript?",
    answer: "Template literals are string literals that allow embedded expressions and multi-line strings. They are enclosed in backticks (`) and can contain expressions inside `${}`."
  },
  {
    id: 16,
    question: "What is the `typeof` operator in JavaScript?",
    answer: "The `typeof` operator returns a string indicating the type of a given operand, such as 'string', 'number', 'undefined', 'boolean', 'object', 'function', etc."
  },
  {
    id: 17,
    question: "What are IIFEs (Immediately Invoked Function Expressions)?",
    answer: "An IIFE is a function that is defined and immediately invoked in the same expression. It is commonly used to create a new scope and avoid polluting the global scope."
  },
  {
    id: 18,
    question: "What is the difference between `==` and `===` in JavaScript?",
    answer: "`==` performs type coercion before comparison (loosely compares), while `===` checks both the value and type (strictly compares)."
  },
  {
    id: 19,
    question: "What are JavaScript modules?",
    answer: "JavaScript modules are units of code that can be imported and exported between files. They allow for better code organization and avoid polluting the global namespace."
  },
  {
    id: 20,
    question: "What is AJAX in JavaScript?",
    answer: "AJAX (Asynchronous JavaScript and XML) is a technique for making asynchronous requests to the server without reloading the entire page. It enables dynamic content loading in web pages."
  },
  {
    id: 21,
    question: "What is event delegation in JavaScript?",
    answer: "Event delegation is a technique where a single event listener is attached to a parent element instead of individual child elements. It takes advantage of event propagation to handle events more efficiently."
  },
  {
    id: 22,
    question: "What is the `Array.prototype.map()` method in JavaScript?",
    answer: "The `map()` method creates a new array by applying a provided function to each element in an existing array. It does not modify the original array."
  },
  {
    id: 23,
    question: "What is the `Array.prototype.filter()` method in JavaScript?",
    answer: "The `filter()` method creates a new array with all elements that pass a given test. It filters the original array without modifying it."
  },
  {
    id: 24,
    question: "What is the `Array.prototype.reduce()` method in JavaScript?",
    answer: "The `reduce()` method applies a function against an accumulator and each element in the array to reduce it to a single value. It is often used to sum values, concatenate arrays, etc."
  },
  {
    id: 25,
    question: "What is an `EventListener` in JavaScript?",
    answer: "An `EventListener` is a method used to attach an event handler to a specific event on an element. It listens for specific events like `click`, `submit`, `keydown`, etc."
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
          <h1>JavaScript Q&A</h1>
          <h3>Explore common JavaScript concepts and answers.</h3>
        </header>

        <div className="qa-list">
          {javascriptQuestions.map((q) => (
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
