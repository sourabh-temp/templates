"use client";

import React, { useState } from 'react';
import '@/styles/Program.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const codeSnippets = [
  {
    id: 1,
    title: "Bubble Sort",
    language: "Ruby",
    code: `
      a = [2,3,1,5,2]
      loop do  
        swapped = false
        (a.length - 1).times do |num|
          if a[num] > a[num + 1]
            a[num], a[num + 1] = a[num + 1], a[num]
            swapped = true
          end
        end
        break unless swapped
      end
      puts a
    `,
    explanation: "This is a simple implementation of the bubble sort algorithm in Ruby.",
    output: "[1, 2, 2, 3, 5]"
  },
  {
    id: 2,
    title: "Count Unique Elements",
    language: "Ruby",
    code: `
      a = [5, 6, 6, 6, 7, 8, 8, 8, 8, 6, 7, 8, 2, 9]
      arrange = {}
      has_arrange = {}

      a.each_with_index do |n, index|
        if a[index] == a[index + 1]
          has_arrange[n] = has_arrange[n] ? has_arrange[n] + 1 : 2
        else
          arrange[n] = true
        end
      end

      puts "Unique elements: #{arrange.keys}"
      puts "Consecutive occurrences: #{has_arrange}"
    `,
    explanation: "This code counts unique elements and their consecutive occurrences.",
    output: "Unique elements: [5, 6, 7, 8, 2, 9]\nConsecutive occurrences: {6: 3, 8: 4}"
  },
  {
    id: 3,
    title: "Find Common Prefix",
    language: "Ruby",
    code: `
      def index(strings)
        strings[0].each_char.with_index do |char, index|
          strings[1..-1].each do |str|
            return strings[0][0...index] if str[index] != char
          end
        end
        return strings[0]
      end

      strings = ["geeksforgeeks", "geeks", "geek", "geezer"]

      puts index(strings)
    `,
    explanation: "This function returns the longest common prefix among a list of strings.",
    output: "gee"
  },
  {
    id: 4,
    title: "Reverse String",
    language: "Ruby",
    code: `
      a = 'sourabh'
      b = a.split('')

      reverse = []
      (b.length - 1).times do |n|
        reverse << b[(b.length) - n - 1]
      end

      puts reverse.join('')
    `,
    explanation: "This code reverses a string by manually splitting and reordering the characters.",
    output: "hbaruos"
  },
  {
    id: 5,
    title: "Count Duplicate Elements",
    language: "Ruby",
    code: `
      a = [5, 6, 6, 6, 7, 8, 8, 8, 8, 6, 7, 8, 2, 9]
      b = []
      has_value = {}

      a.each do |n|
        if !b.include?(n)
          b << n
        else
          has_value[n] = has_value[n] ? has_value[n] + 1 : 1
        end
      end

      puts has_value
    `,
    explanation: "This code counts duplicate elements in an array and stores them in a hash.",
    output: "{6: 3, 8: 4}"
  },
  {
    id: 6,
    title: "Count Frequency of Characters",
    language: "Ruby",
    code: `
      a = "sooorraabbbbbbhh".split('')
      b = []
      has_value = {}

      a.each do |n|
        has_value[n] = has_value[n] ? has_value[n] + 1 : 1
      end

      puts has_value
    `,
    explanation: "This code counts the frequency of each character in a string.",
    output: "{s: 1, o: 3, r: 2, a: 2, b: 6, h: 2}"
  },
  {
    id: 7,
    title: "Matching Elements in Integer Array",
    language: "Ruby",
    code: `
      a = [1, 2, 3, 4, 5]
      b = [3, 4, 5, 6, 7]
      result = a & b
      puts result
    `,
    explanation: "This code finds the common elements between two arrays using the intersection operator (&).",
    output: "[3, 4, 5]"
  },
  {
    id: 8,
    title: "Swap Two Numbers Without Third Variable",
    language: "Ruby",
    code: `
      a = 5
      b = 10
      a = a + b
      b = a - b
      a = a - b
      puts "a: #{a}, b: #{b}"
    `,
    explanation: "This code swaps the values of two variables without using a third temporary variable, using arithmetic operations.",
    output: "a: 10, b: 5"
  },
  {
    id: 9,
    title: "Factorial of an Integer",
    language: "Ruby",
    code: `
      def factorial(n)
        return 1 if n == 0
        n * factorial(n - 1)
      end

      puts factorial(5)
    `,
    explanation: "This code calculates the factorial of a number recursively.",
    output: "120"
  },
  {
    id: 10,
    title: "Find Second Largest Number in Array",
    language: "Ruby",
    code: `
      a = [1, 5, 2, 9, 7]
      a.sort!
      second_largest = a[-2]
      puts second_largest
    `,
    explanation: "This code sorts the array in ascending order and retrieves the second largest element.",
    output: "7"
  },
  {
    id: 11,
    title: "Remove All Occurrences of a Character",
    language: "Ruby",
    code: `
      input_string = "hello world"
      char_to_remove = "o"
      result = input_string.delete(char_to_remove)
      puts result
    `,
    explanation: "This code removes all occurrences of a specified character from the string.",
    output: "hell wrld"
  },
  {
    id: 12,
    title: "Check if a Number is Prime",
    language: "Ruby",
    code: `
      def is_prime?(n)
        return false if n <= 1
        (2..Math.sqrt(n)).each do |i|
          return false if n % i == 0
        end
        true
      end

      puts is_prime?(7)
    `,
    explanation: "This code checks if a number is prime by dividing it by all numbers up to its square root.",
    output: "true"
  },
  {
    id: 13,
    title: "Sum All Elements in an Array",
    language: "Ruby",
    code: `
      a = [1, 2, 3, 4, 5]
      sum = a.sum
      puts sum
    `,
    explanation: "This code sums all the elements of an array using the `sum` method.",
    output: "15"
  },
];

const Programm = () => {
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [userCode, setUserCode] = useState('');

  const handleSnippetClick = (snippet) => {
    setCurrentSnippet(snippet);
    setUserCode(snippet.code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userCode).then(() => {
      alert("Code copied to clipboard!");
    }, (err) => {
      console.error("Could not copy text: ", err);
    });
  };

  return (
    <>
      <Header />
      <div className="code-body">
        <div className="code-runner">
          <header className="program-header">
            <h1>Code Snippets</h1>
            <h3>Select a program to view its code:</h3>
          </header>

          {/* Snippet List */}
          <div className="snippet-list">
            {codeSnippets.map((snippet) => (
              <div 
                key={snippet.id} 
                className={`snippet-title ${currentSnippet?.id === snippet.id ? 'active' : ''}`} 
                onClick={() => handleSnippetClick(snippet)}
              >
                {snippet.title}
              </div>
            ))}
          </div>

          {/* Code Details */}
          {currentSnippet ? (
            <div className="code-details">
              <h2>{currentSnippet.title}</h2>
              <h4>{currentSnippet.language}</h4>
              <button className="copy-button" onClick={copyToClipboard}>Copy Code</button>
              <pre>{currentSnippet.code}</pre>
              <p>{currentSnippet.explanation}</p>

              {/* Output Section */}
              <div className="code-output">
                <h4>Output:</h4>
                <pre>{currentSnippet.output}</pre>
              </div>
            </div>
          ):(
            <div className="code-details1">
              <h1>Code Snippets</h1>
              <h3>Select a program to view its code:</h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Programm;
