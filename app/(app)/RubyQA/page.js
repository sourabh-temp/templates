"use client"
import React, { useState } from "react";
import "@/styles/QA.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const rubyQuestions = [
  {
    id: 1,
    question: "What is Ruby on Rails?",
    answer: "Ruby on Rails is an open-source web application framework built in the Ruby programming language. It follows the MVC (Model-View-Controller) architecture to provide a streamlined approach to building web apps."
  },
  {
    id: 2,
    question: "What is the difference between before_save, before_create, and before_update?",
    answer: "Before_save is called on both create and update actions. Before_create is called before a new record is created. Before_update is triggered before an existing record is updated."
  },
  {
    id: 3,
    question: "How many types of associations are in Rails?",
    answer: "Rails supports several types of associations: belongs_to, has_one, has_many, has_many :through, has_one :through, has_and_belongs_to_many."
  },
  {
    id: 4,
    question: "What is the difference between has_many:through and has_and_belongs_to_many?",
    answer: "has_many :through requires an intermediate model to store additional attributes. has_and_belongs_to_many does not require an intermediate model."
  },
  {
    id: 5,
    question: "What are validations in Rails?",
    answer: "Validations ensure that data entered meets certain criteria before being saved to the database. They are checked during the object’s lifecycle, usually before saving or creating a record."
  },
  {
    id: 6,
    question: "What do you mean by polymorphic associations in Rails?",
    answer: "Polymorphic associations allow a model to belong to more than one other model using a single association. For example, a comment model might belong to both posts and photos."
  },
  {
    id: 7,
    question: "What is inheritance in Rails and how many types of inheritance are in Rails?",
    answer: "Inheritance in Rails refers to the way child models inherit behavior from parent models. Rails supports Single Table Inheritance (STI) and Class Inheritance."
  },
  {
    id: 8,
    question: "What are scopes in Rails?",
    answer: "Scopes in Rails are used to define reusable queries that can be applied to models. For example, `scope :published, -> { where(published: true) }`."
  },
  {
    id: 9,
    question: "What is the difference between class methods and scopes in Rails?",
    answer: "Class methods are Ruby methods defined on a model class, whereas scopes are query methods specifically designed to return ActiveRecord relations that can be chained and reused."
  },
  {
    id: 10,
    question: "What is the difference between update and update_column in Rails?",
    answer: "update saves the object with the validation, while update_column skips validations and directly updates the column in the database."
  },
  {
    id: 11,
    question: "What do you mean by Active Record callback? Explain some Active Record callbacks.",
    answer: "Active Record callbacks are methods that are triggered at various points during the lifecycle of an Active Record object, such as before or after create, update, or destroy actions. Examples include before_save, after_create, and before_destroy."
  },
  {
    id: 12,
    question: "How can you define custom validations in Rails?",
    answer: "Custom validations can be defined in Rails by using the `validate` method, which calls a custom validation method. Example: `validate :check_some_condition`."
  },
  {
    id: 13,
    question: "What do you mean by STI (Single Table Inheritance)? What are its advantages and disadvantages?",
    answer: "STI is a design pattern where multiple subclasses share a single database table. Advantages include simplicity and ease of management. Disadvantages include difficulties with schema changes and queries for specific subtypes."
  },
  {
    id: 14,
    question: "What do you mean by N+1 query? How can you resolve N+1 query? Explain by an example.",
    answer: "The N+1 query problem occurs when multiple queries are executed, one for each record in a collection. It can be resolved by using `includes` or `eager_load` to load all related records in a single query."
  },
  {
    id: 15,
    question: "What do you mean by migrations in Rails? What is the usage of Rails migrations?",
    answer: "Migrations in Rails are a way to modify the database schema over time in a consistent and version-controlled manner. They allow you to create, alter, or drop tables and columns."
  },
  {
    id: 16,
    question: "What is the difference between include and join?",
    answer: "The `include` method is used for eager loading associations, whereas `join` is used to perform a SQL join to combine data from multiple tables."
  },
  {
    id: 17,
    question: "What do you mean by self-join associations in Rails?",
    answer: "A self-join association occurs when a model has a relationship with itself. This is commonly used for hierarchical data like a user having a manager, where both are instances of the same model."
  },
  {
    id: 18,
    question: "What do you mean by by-ORM? Explain.",
    answer: "By-ORM refers to the use of an Object-Relational Mapping tool like ActiveRecord, which allows you to interact with the database using Ruby objects instead of writing raw SQL queries."
  },
  {
    id: 19,
    question: "Is it possible to change the connection of naming a table in Rails? If yes, how will you do this? Please explain.",
    answer: "Yes, it is possible to change the table name in Rails by using the `self.table_name` attribute in the model. For example, `self.table_name = 'new_table_name'`."
  },
  {
    id: 20,
    question: "What do you mean by rolling back a migration? How can you rollback a specific migration?",
    answer: "Rolling back a migration undoes the changes made by a migration. You can roll back a specific migration by running `rails db:migrate:down VERSION=your_migration_version`."
  },
  {
    id: 21,
    question: "What are the relational and conditional callbacks in ActiveRecord in Rails? Explain.",
    answer: "Relational callbacks are used to maintain data integrity across related records, such as `before_save` or `before_destroy`. Conditional callbacks are triggered based on certain conditions, like `if: :some_condition`."
  },
  {
    id: 22,
    question: "What are transactional callbacks?",
    answer: "Transactional callbacks are used to ensure that multiple operations within a transaction are successful or rolled back. They ensure that if one part of the transaction fails, the entire operation is rolled back."
  },
  {
    id: 23,
    question: "What do you mean by default_scope?",
    answer: "default_scope sets the default scope applied to all queries for a model, unless overridden. Example: `default_scope { where(active: true) }`."
  },
  {
    id: 24,
    question: "Explain the routing in Rails.",
    answer: "Routing in Rails defines how HTTP requests are mapped to controller actions. It is configured in `config/routes.rb` using resources, resources blocks, or custom routes."
  },
  {
    id: 25,
    question: "What do you mean by member and collections routes?",
    answer: "Member routes are used for actions that operate on a single resource, while collection routes are used for actions that operate on a collection of resources."
  },
  {
    id: 26,
    question: "What do you know about namespace and scoped routing? What is the difference between both?",
    answer: "Namespace routing groups related controllers under a module, while scoped routing creates custom routes within a specific scope. The main difference is that namespaces also update the controller paths."
  },
  {
    id: 27,
    question: "What is a repository in Git?",
    answer: "A Git repository is a data structure used to track changes in files and store metadata such as commit history, branches, and tags."
  },
  {
    id: 28,
    question: "What is version control?",
    answer: "Version control is a system that tracks changes to files, enabling you to revert to previous versions and collaborate on code effectively."
  },
  {
    id: 29,
    question: "What is rollback in migrations?",
    answer: "Rollback in migrations allows you to undo changes made by a migration, such as dropping tables or columns. You can do this by running `rails db:rollback`."
  },
  {
    id: 30,
    question: "What is the difference between update and update_column and update_columns?",
    answer: "update saves the object with validation checks, while update_column and update_columns skip validations and directly update the column(s) in the database."
  },
  {
    id: 31,
    question: "What is delete, drop, and truncate?",
    answer: "delete removes individual rows from a table without affecting the table structure, drop removes the entire table, and truncate removes all rows in a table but does not affect the table structure."
  },
  {
    id: 32,
    question: "What is RSpec, and why is it used in Rails development?",
    answer: "RSpec is a testing framework for Ruby, commonly used for writing unit tests, integration tests, and acceptance tests in Rails applications."
  },
  {
    id: 33,
    question: "Explain the difference between unit tests, integration tests, and acceptance tests in RSpec. Give examples of each.",
    answer: "Unit tests verify individual components, integration tests verify interactions between components, and acceptance tests verify that the app works as a whole. Example: Unit - testing a model method, Integration - testing a controller action, Acceptance - testing user sign-up process."
  },
  {
    id: 34,
    question: "What are the main components of an RSpec test file, and what is the purpose of each?",
    answer: "An RSpec test file typically contains `describe` (defines the context or functionality), `context` (sets up specific conditions), and `it` (defines the behavior or test case)."
  },
  {
    id: 35,
    question: "What is the role of the describe, context, and it blocks in RSpec tests?",
    answer: "`describe` defines a group of tests, `context` specifies particular conditions for a test, and `it` describes a specific example or behavior being tested."
  },
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
          <h1>Ruby on Rails Q&A</h1>
          <h3>Explore common Ruby on Rails concepts and answers.</h3>
        </header>

        <div className="qa-list">
          {rubyQuestions.map((q) => (
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
