"use client"
import React, { useState } from "react";
import "@/styles/QA.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const pythonQuestions = [
  {
    id: 1,
    question: "What is Python?",
    answer: "Python is a high-level, interpreted programming language known for its easy-to-read syntax and versatility. It supports multiple programming paradigms such as procedural, object-oriented, and functional programming."
  },
  {
    id: 2,
    question: "What are Python's key features?",
    answer: "Python's key features include simple syntax, dynamic typing, high-level data structures, and a large standard library. It also supports object-oriented and functional programming paradigms."
  },
  {
    id: 3,
    question: "What is PEP 8?",
    answer: "PEP 8 (Python Enhancement Proposal 8) is the style guide for Python code. It provides conventions for writing clean, readable, and consistent code in Python, such as indentation, variable naming, and line length."
  },
  {
    id: 4,
    question: "What is the difference between `list` and `tuple` in Python?",
    answer: "A `list` is mutable, meaning its elements can be changed after creation, while a `tuple` is immutable, meaning its elements cannot be modified after creation."
  },
  {
    id: 5,
    question: "What are Python decorators?",
    answer: "Python decorators are a way to modify or extend the behavior of a function or method without changing its actual code. They are typically used to add functionality such as logging, access control, or memoization."
  },
  {
    id: 6,
    question: "What is a lambda function in Python?",
    answer: "A lambda function in Python is an anonymous, one-line function defined with the `lambda` keyword. It is often used for short-term operations and can take any number of arguments, but it only has one expression."
  },
  {
    id: 7,
    question: "What are Python modules?",
    answer: "A Python module is a file containing Python code that can define functions, classes, and variables, and can be included in other programs. Modules help in organizing code and reusability."
  },
  {
    id: 8,
    question: "What is a Python class?",
    answer: "A Python class is a blueprint for creating objects (instances). It defines attributes (variables) and methods (functions) that the objects created from the class will have."
  },
  {
    id: 9,
    question: "What is inheritance in Python?",
    answer: "Inheritance in Python allows a class (child class) to inherit attributes and methods from another class (parent class). It facilitates code reusability and hierarchy in classes."
  },
  {
    id: 10,
    question: "What is the difference between `deepcopy` and `shallow copy` in Python?",
    answer: "A `shallow copy` creates a new object but does not copy the nested objects, rather it references them. A `deepcopy` creates a new object and recursively copies all objects, ensuring no shared references."
  },
  {
    id: 11,
    question: "What is a generator in Python?",
    answer: "A generator is a special type of iterator in Python that allows you to iterate over a potentially large dataset lazily. It generates values on the fly using the `yield` keyword."
  },
  {
    id: 12,
    question: "What are Python's built-in data types?",
    answer: "Python's built-in data types include integers, floats, strings, lists, tuples, sets, dictionaries, booleans, and None."
  },
  {
    id: 13,
    question: "What is a Python list comprehension?",
    answer: "List comprehension is a concise way to create lists in Python. It allows you to generate a new list by applying an expression to each item in an iterable."
  },
  {
    id: 14,
    question: "What are Python's standard libraries?",
    answer: "Python's standard library is a collection of modules and packages that come bundled with Python. It includes libraries for file I/O, regular expressions, math operations, networking, and more."
  },
  {
    id: 15,
    question: "What is the difference between `==` and `is` in Python?",
    answer: "`==` checks for value equality, while `is` checks for identity equality (whether two objects refer to the same memory location)."
  },
  {
    id: 16,
    question: "What is the purpose of `self` in Python?",
    answer: "`self` is a reference to the current instance of the class. It is used to access variables and methods that belong to the class instance."
  },
  {
    id: 17,
    question: "What are Python iterators?",
    answer: "An iterator is an object in Python that implements the `__iter__()` and `__next__()` methods. It allows you to iterate over a collection (such as a list or a tuple) one element at a time."
  },
  {
    id: 18,
    question: "What is the difference between `range()` and `xrange()` in Python?",
    answer: "`range()` returns a list, whereas `xrange()` (in Python 2) returns an iterator. In Python 3, `range()` behaves like `xrange()` by returning an iterator."
  },
  {
    id: 19,
    question: "What is the `with` statement in Python?",
    answer: "The `with` statement is used for resource management (e.g., opening a file). It ensures that resources are properly cleaned up after use, even if an error occurs during their use."
  },
  {
    id: 20,
    question: "What are Python exceptions?",
    answer: "Exceptions in Python are errors that occur during program execution. They can be caught and handled using `try`, `except`, and `finally` blocks."
  },
  {
    id: 21,
    question: "What is the purpose of the `pass` statement in Python?",
    answer: "The `pass` statement in Python is a placeholder that does nothing. It is often used in empty functions or classes where code is required syntactically but no action is needed."
  },
  {
    id: 22,
    question: "What are Python's built-in functions?",
    answer: "Python has a wide range of built-in functions like `print()`, `len()`, `range()`, `sum()`, `type()`, `input()`, `map()`, `filter()`, etc."
  },
  {
    id: 23,
    question: "What is the `lambda` keyword used for in Python?",
    answer: "The `lambda` keyword is used to create small anonymous functions in Python. These functions can take any number of arguments but can only have a single expression."
  },
  {
    id: 24,
    question: "What is multithreading in Python?",
    answer: "Multithreading in Python allows multiple threads to run concurrently in a single process. It is often used for I/O-bound tasks but can be limited by Python's Global Interpreter Lock (GIL) for CPU-bound tasks."
  },
  {
    id: 25,
    question: "What is the difference between `append()` and `extend()` in Python?",
    answer: "`append()` adds a single element to a list, while `extend()` adds multiple elements from an iterable (like another list) to the existing list."
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
          <h1>Python Q&A</h1>
          <h3>Explore common Python concepts and answers.</h3>
        </header>

        <div className="qa-list">
          {pythonQuestions.map((q) => (
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
