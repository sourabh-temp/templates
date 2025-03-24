"use client"
import React, { useState } from "react";
import "@/styles/QA.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const javaQuestions = [
  {
    id: 1,
    question: "What is Java?",
    answer: "Java is a high-level, object-oriented programming language used for building cross-platform applications. It is known for its 'Write Once, Run Anywhere' philosophy, where code can run on any device that has the Java Virtual Machine (JVM) installed."
  },
  {
    id: 2,
    question: "What are the key features of Java?",
    answer: "Java's key features include platform independence, automatic memory management (garbage collection), multithreading support, object-oriented principles, and a rich standard library."
  },
  {
    id: 3,
    question: "What is the difference between JDK, JRE, and JVM?",
    answer: "The JDK (Java Development Kit) is used for developing Java applications, the JRE (Java Runtime Environment) is used to run Java applications, and the JVM (Java Virtual Machine) is responsible for running the bytecode on any platform."
  },
  {
    id: 4,
    question: "What is an object in Java?",
    answer: "An object in Java is an instance of a class. It encapsulates data (attributes) and methods (functions) that operate on the data."
  },
  {
    id: 5,
    question: "What is inheritance in Java?",
    answer: "Inheritance in Java allows one class (subclass or child class) to inherit fields and methods from another class (superclass or parent class), enabling code reusability and creating a hierarchical class structure."
  },
  {
    id: 6,
    question: "What is the difference between `==` and `equals()` in Java?",
    answer: "`==` checks if two objects refer to the same memory location (reference comparison), while `equals()` checks if the content of two objects is equal (value comparison)."
  },
  {
    id: 7,
    question: "What is the Java `String` pool?",
    answer: "The String pool in Java is a special storage area in memory where Java stores string literals. This ensures that duplicate string values are not stored multiple times, improving memory efficiency."
  },
  {
    id: 8,
    question: "What is a constructor in Java?",
    answer: "A constructor is a special method in Java used to initialize objects. It is called when an object of a class is created and has the same name as the class."
  },
  {
    id: 9,
    question: "What is method overloading in Java?",
    answer: "Method overloading in Java is when multiple methods with the same name but different parameters (different number or type of parameters) are defined in a class. The correct method is chosen based on the arguments passed during the method call."
  },
  {
    id: 10,
    question: "What is method overriding in Java?",
    answer: "Method overriding in Java occurs when a subclass provides a specific implementation of a method that is already defined in its superclass. It allows a subclass to modify or extend the behavior of the inherited method."
  },
  {
    id: 11,
    question: "What is an interface in Java?",
    answer: "An interface in Java is a reference type, similar to a class, that can contain only constants, method signatures, default methods, static methods, and nested types. Interfaces cannot have method implementations, but they can be implemented by classes."
  },
  {
    id: 12,
    question: "What is an abstract class in Java?",
    answer: "An abstract class in Java is a class that cannot be instantiated and may contain abstract methods (methods without implementation). It is meant to be subclassed, where the abstract methods are implemented by subclasses."
  },
  {
    id: 13,
    question: "What is exception handling in Java?",
    answer: "Exception handling in Java is a mechanism to handle runtime errors, using `try`, `catch`, `finally`, and `throw` statements. It ensures that the program continues executing even if an error occurs during runtime."
  },
  {
    id: 14,
    question: "What is the `final` keyword in Java?",
    answer: "The `final` keyword in Java can be used to define constants, prevent method overriding, or prevent inheritance. It can be applied to variables, methods, and classes."
  },
  {
    id: 15,
    question: "What is polymorphism in Java?",
    answer: "Polymorphism in Java refers to the ability of an object to take on multiple forms. It can be achieved through method overloading (compile-time polymorphism) and method overriding (runtime polymorphism)."
  },
  {
    id: 16,
    question: "What is the difference between `ArrayList` and `LinkedList` in Java?",
    answer: "An `ArrayList` is backed by a dynamic array and provides fast access by index, but slower insertions or deletions. A `LinkedList` is backed by a doubly-linked list and provides fast insertions and deletions but slower access by index."
  },
  {
    id: 17,
    question: "What is a Java thread?",
    answer: "A thread in Java is a lightweight process that allows concurrent execution of two or more parts of a program. Threads in Java are created by implementing the `Runnable` interface or extending the `Thread` class."
  },
  {
    id: 18,
    question: "What is synchronization in Java?",
    answer: "Synchronization in Java is a mechanism that ensures that only one thread can access a resource at a time. It is achieved by using the `synchronized` keyword."
  },
  {
    id: 19,
    question: "What is a `HashMap` in Java?",
    answer: "A `HashMap` in Java is a collection class that implements the `Map` interface. It stores key-value pairs and allows for fast retrieval of values based on the key."
  },
  {
    id: 20,
    question: "What is the difference between `ArrayList` and `Vector` in Java?",
    answer: "`ArrayList` is not synchronized, whereas `Vector` is synchronized. `ArrayList` offers better performance than `Vector` because of the lack of synchronization overhead."
  },
  {
    id: 21,
    question: "What is the difference between `throw` and `throws` in Java?",
    answer: "`throw` is used to explicitly throw an exception, while `throws` is used to declare that a method might throw an exception, allowing the caller to handle it."
  },
  {
    id: 22,
    question: "What is the Java `Stream` API?",
    answer: "The Java `Stream` API is used to process sequences of elements, such as collections, in a functional style. It allows for operations like filtering, mapping, and reducing."
  },
  {
    id: 23,
    question: "What are lambda expressions in Java?",
    answer: "Lambda expressions in Java are a feature introduced in Java 8 that allow you to write concise code by passing a block of code as a parameter to methods, typically used with functional interfaces."
  },
  {
    id: 24,
    question: "What is the difference between `String` and `StringBuilder` in Java?",
    answer: "`String` objects are immutable, meaning their value cannot be changed once created. `StringBuilder`, on the other hand, is mutable and allows for efficient string modification."
  },
  {
    id: 25,
    question: "What is the Java `try-with-resources` statement?",
    answer: "The `try-with-resources` statement is used to automatically close resources such as files or database connections at the end of a block of code, ensuring that resources are properly cleaned up."
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
          <h1>Java Q&A</h1>
          <h3>Explore common Java concepts and answers.</h3>
        </header>

        <div className="qa-list">
          {javaQuestions.map((q) => (
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
