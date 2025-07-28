# NodeJs Course Outline

## Getting Started

- What is Node
- Node Architecture
- How Node Works
- Your First Node Program

## Node Module System

- Introduction
- Global Object
- Modules
- Creating a Module
- Loading a Module
- Module Wrapper Function
- Path Module
- OS Module
- File System Module
- Events Module
- Event Arguments
- Extending EventEmitter
- HTTP Module

## Node Package Manager

- Introduction
- Package.json
- Installing a Node Package
- Using a Package
- Package Dependencies
- NPM Packages and Source Control
- Semantic Versioning
- Listing the Installed Packages
- Viewing Registry Info for a Package
- Installing a Specific Version of a Package
- Updating Local Packages
- DevDependencies
- Uninstalling a Package
- Working with Global Packages
- Publishing a Package
- Updating a Published Package

## Building RESTful API's Using Express

- RESTful Services
- Introducing Express
- Building Your First Web Server
- Nodemon
- Environment Variables
- Route Parameters
- Handling HTTP GET Requests
- Handling HTTP POST Requests
- Input Validation
- Handling HTTP PUT Requests
- Handling HTTP Delete Requests
- Project- Build the Genres API

## Express- Advanced Topics

- Middleware
- Creating Custom Middleware
- Built-in Middleware
- Third-party Middleware
- Environments
- Configuration
- Debugging
- Templating Engines
- Database Integration
- Authentication
- Structuring Express Applications

## Asynchronous JavaScript

- Synchronous vs Asynchronous Code
- Patterns for Dealing with Asynchronous Code
- Callbacks
- Callback Hell
- Named Functions to Rescue
- Promises
- Replacing Callbacks with Promises
- Consuming Promises
- Creating Settled Promises
- Running Promises in Parallel
- Async and Await

## CRUD Operations Using Mongoose

- Introducing MongoDB
- Installing MongoDB on Windows
- Connecting to MongoDB
- Schemas
- Models
- Saving a Document
- Querying Documents
- Comparison Query Operators
- Logical Query Operators
- Regular Expressions
- Counting
- Pagination
- Updating a Document- Query First
- Updating a Document- Update First
- Removing Documents

## Mongo - Data Validation

- Validation
- Built-in Validators
- Custom Validators
- Async Validators
- Validation Errors
- SchemaType Options
- Project- Add Persistence to Genres API
- Project- Build the Customers API
- Restructuring the Project

## Mongoose- Modeling Relationships between Connected Data

- Modelling Relationships
- Referencing Documents
- Population
- Embedding Documents
- Using an Array of Sub-documents
- Project- Build the Movies API
- Project- Build the Rentals API
- Transactions
- ObjectID
- Validating ObjectIDs
- A Better Implementation

## Authentication and Authorization

- Introduction
- Creating the User Model
- Registering Users
- Using Lodash
- Hashing Passwords
- Authenticating Users
- JSON Web Tokens
- Generating Authentication Tokens
- Storing Secrets in Environment Variables
- Setting Response Headers
- Encapsulating Logic in Mongoose Models
- Authorization Middleware
- Protecting Routes
- Getting the Current User
- Logging Out Users
- Role-based Authorization

## Handling and Logging Errors

- Handling Rejected Promises
- Express Error Middleware
- Removing Try Catch Blocks
- Express Async Errors
- Logging Errors - Custom Logger ( My Addition )
- Logging Errors - Default Logger ( My Addition )
- Logging to MongoDB
- Uncaught Exceptions
- Unhandled Promise Rejections
- Error Handling Recap
- Extracting Routes
- Extracting the Db Logic
- Extracting the Logging Logic
- Extracting the Config Logic
- Extracting the Validation Logic
- Extracting the viewEngine Logic
- Customized Winston Logging for console output. ( My Addition )

## Unit Testing

- What is Automated Testing
- Benefits of Automated Testing
- Types of Tests
- Test Pyramid
- Tooling
- Writing Your First Unit Test
- Testing Numbers
- Grouping Tests
- Refactoring with Confidence
- Testing Strings
- Testing Arrays
- Testing Objects
- Testing Exceptions
- Continuously Running Tests
- Exercise- Testing the FizzBuz
- Creating Simple Mock Functions
- Interaction Testing
- Jest Mock Functions
- What to Unit Test

## Integration Testing

- Introduction
- Preparing the App
- Setting Up the Test Db
- Your First Integration Test
- Populating the Test Db
- Testing Routes with Parameters
- Validating ObjectIDs
- Refactoring with Confidence
- Testing the Authorization
- Testing the Invalid Inputs
- Testing the Happy Path
- Writing Clean Tests
- Testing the Auth Middleware
- Unit Testing the Auth Middleware
- Code Coverage

## Test-Driven Development

- What is Test-driven Development
- Implementing the Returns
- Test Cases
- Populating the Database
- Testing the Authorization
- Testing the Input
- Refactoring Tests
- Looking Up an Object
- Testing if Rental Processed
- Testing the Valid Request
- Testing the ReturnDate
- Testing the RentalFee
- Testing the Movie Stock
- Testing the Response
- Refactoring the Validation Logic
- Mongoose Static Methods
- Refactoring the Domain Logic

## Deployment

- Introduction
- Preparing the App for Production
