"use client"
import React, { useState } from "react";
import "@/styles/QA.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const reactQuestions = [
  {
    id: 1,
    question: "What are React hooks?",
    answer: "React hooks are functions that let you 'hook into' React state and lifecycle features from function components. They allow function components to manage state, side effects, and perform other React features that were previously only available in class components."
  },
  {
    id: 2,
    question: "What are the advantages of using hooks over class components?",
    answer: "Hooks simplify code, make components more readable, allow for easier state management, enable reusable logic via custom hooks, and improve performance in certain cases."
  },
  {
    id: 3,
    question: "What is the `useState` hook?",
    answer: "The `useState` hook is used to declare and manage state in a functional component. It returns an array with two values: the current state value and a function to update that state."
  },
  {
    id: 4,
    question: "What is the `useEffect` hook?",
    answer: "The `useEffect` hook is used to perform side effects in function components. It replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components."
  },
  {
    id: 5,
    question: "What are some use cases for `useEffect`?",
    answer: "Some use cases for `useEffect` include fetching data, setting up subscriptions, updating the DOM, and setting timers like `setInterval` or `setTimeout`."
  },
  {
    id: 6,
    question: "What is `useContext` and how does it work?",
    answer: "`useContext` is a hook that allows you to access the context value directly from any functional component. It helps in avoiding prop drilling by sharing data between components without passing props manually."
  },
  {
    id: 7,
    question: "What is the `useReducer` hook and when would you use it?",
    answer: "`useReducer` is an alternative to `useState` for managing complex state logic. It is used when multiple state variables or actions need to be handled in a more structured way, like managing complex state updates."
  },
  {
    id: 8,
    question: "What is the `useMemo` hook?",
    answer: "`useMemo` is a hook that memorizes the result of a function and only recalculates it when the dependencies change. It is useful for performance optimization, especially for expensive calculations."
  },
  {
    id: 9,
    question: "What is `React.memo()`?",
    answer: "`React.memo()` is a higher-order component (HOC) that memoizes the result of a component render. It prevents unnecessary re-renders of functional components when the props have not changed."
  },
  {
    id: 10,
    question: "What is the `useCallback` hook?",
    answer: "`useCallback` is a hook that memoizes a function, preventing it from being recreated unless its dependencies change. It helps in avoiding unnecessary re-renders when passing functions as props to child components."
  },
  {
    id: 11,
    question: "What are the rules of hooks?",
    answer: "The rules of hooks are: (1) Call hooks at the top level, (2) Call hooks from React functions (components or custom hooks), (3) Always use hooks in the same order."
  },
  {
    id: 12,
    question: "What is the `useRef` hook and how does it differ from `useState`?",
    answer: "`useRef` is a hook that persists a value across renders without causing a re-render. It is useful for referencing DOM elements or storing mutable values. `useState`, on the other hand, causes a component to re-render when the state value changes."
  },
  {
    id: 13,
    question: "What is `useLayoutEffect` and how is it different from `useEffect`?",
    answer: "`useLayoutEffect` is a hook that works similarly to `useEffect`, but it runs synchronously after the DOM mutations. It is useful when you need to make changes to the DOM before the browser paints."
  },
  {
    id: 14,
    question: "What are custom hooks in React?",
    answer: "Custom hooks are JavaScript functions that allow you to encapsulate and reuse component logic. They follow the same rules as regular hooks but are user-defined for specific functionality."
  },
  {
    id: 15,
    question: "What is `useImperativeHandle` and how does it work?",
    answer: "`useImperativeHandle` is a hook used to customize the instance value exposed to parent components when using `ref`. It is useful to expose specific methods or properties from child components."
  },
  {
    id: 16,
    question: "What are Controlled vs Uncontrolled components?",
    answer: "Controlled components are those where the component's state is managed by React (using `useState`). Uncontrolled components manage their own state internally using `refs` (e.g., form elements like `<input />`)."
  },
  {
    id: 17,
    question: "What is a Higher Order Component?",
    answer: "A Higher Order Component (HOC) is a function that takes a component and returns a new component with additional functionality or props. It allows logic to be reused across components."
  },
  {
    id: 18,
    question: "What is a virtual DOM, how is it different from a real DOM and how it works?",
    answer: "The virtual DOM is a lightweight copy of the real DOM used by React to optimize updates. When the state of a component changes, React updates the virtual DOM first, compares it with the previous virtual DOM, and then efficiently updates the real DOM."
  },
  {
    id: 19,
    question: "What is the difference between componentDidMount and `useEffect`?",
    answer: "`componentDidMount` is a lifecycle method in class components that runs after the component is mounted. `useEffect` is a hook in function components that can perform side effects after the component renders and can handle updates, mounting, and unmounting."
  },
  {
    id: 20,
    question: "What are React fragments?",
    answer: "React Fragments let you group multiple elements without adding extra nodes to the DOM. They help keep the HTML structure cleaner and avoid unnecessary wrapper elements."
  },
  {
    id: 21,
    question: "What is JSX?",
    answer: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. React components are written using JSX, which then gets compiled into regular JavaScript."
  },
  {
    id: 22,
    question: "What is prop and what is prop drilling and what is the solution to avoid prop drilling?",
    answer: "Props are used to pass data from parent to child components. Prop drilling is when data is passed down through many layers of components. A solution to avoid prop drilling is to use the Context API or state management libraries like Redux."
  },
  {
    id: 23,
    question: "What is Context in React?",
    answer: "Context in React provides a way to share data between components without having to pass props manually. It helps avoid prop drilling by allowing you to pass data through a component tree without explicit props."
  },
  {
    id: 24,
    question: "What are various ways to style a React app?",
    answer: "React apps can be styled using CSS, inline styles, CSS modules, styled-components, or third-party libraries like Tailwind CSS and Emotion."
  },
  {
    id: 25,
    question: "What are render props in React?",
    answer: "Render props is a pattern for sharing code between components using a function prop that returns a component. It allows one component to control rendering logic in another component."
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
          <h1>React Q&A</h1>
          <h3>Explore common React concepts and answers.</h3>
        </header>

        <div className="qa-list">
          {reactQuestions.map((q) => (
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
