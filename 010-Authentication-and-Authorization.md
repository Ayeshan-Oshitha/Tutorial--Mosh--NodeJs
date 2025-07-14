# Introduction

**Authentication** - The process of verifying the identity of a user to confirm they are who they claim to be

**Authorization** - The process of determining whether a user has the necessary permissions to perform a specific action

- Register: POST /api/users

- Login: POST /api/users - Sometimes, the operation we're dealing with doesn't follow the typical Create, Read, Update, Delete (CRUD) semantics. In RESTful terms, we model such operations as requests or commands — for example, a login request or login command.

  - **Command** - emphasizes the intent to perform an action.

  - **Request** - Refers to a custom operation that doesn't map to a standard REST resource.

# Registering User

findById(id) - Used to find a document by its \_id field only

findOne(filter) - Used to find a document matching any condition(s)
