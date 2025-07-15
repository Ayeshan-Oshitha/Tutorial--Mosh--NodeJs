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

# Using Loash

When returning data, we **should not return the password**. We can simply return the object without the password, and that is okay.

```javascript
res.send({
    _id:result._id
    name:result.name,
    email:result.email
});

```

But to do this more efficiently, we can use an external library called **`Lodash`**.

Lodash provides a lot of utility functions to work with objects, numbers, arrays, and strings. It is an optimized version of the **`Underscore`** package.

Also, if we want to enforce password complexity (like requiring lowercase, uppercase letters, numbers, etc.), we can use the npm package **`joi-password-complexity`**, which is built on top of Joi.

# Hashing Passwords

To hash passwords, we can use the popular library called bcrypt.

To hash a password, we need a salt. Salt means a random string that we add to the beginning or end of the password.
For example, if the password is 1234 and the hash result is abcd, a hacker could try many passwords and compare hashes to guess the password. But when we use salt, the resulting hashed password is different each time because of the salt used.

So, the hashed password includes the salt, either at the beginning or after.

```txt
Password: 123456
Salt: $2b$10$5wW6VYH1aZZe8j3qGFkdSe
Hashed password: $2b$10$5wW6VYH1aZZe8j3qGFkdSeidy5l.lFjvCilXWCzlR9U4x7.uMe16q

# Breaking down the hashed password:

$2b$ — version
10$ — cost factor (salt rounds)
5wW6VYH1aZZe8j3qGFkdSe — salt
idy5l.lFjvCilXWCzlR9U4x7.uMe16q — hashed password
```

The reason the salt is included in the hash is: when we authenticate the user, we want to validate the username and password. So when the user sends their password in plain text, we need to hash it again — but we need the original salt that was used to generate the stored hash.

During comparison of the plain text password with the hashed password, bcrypt extracts the original salt from the hash automatically to perform the validation correctly.

# Authenticating Users

**Note** - When Validating Passwords, We use `bcrypt.compare` method. In there, Bcrypt doesn't decrypt the stored password. Instead, it extracts the salt from the stored hash, re-hashes the plain text password using that salt, and compares the result with the stored hash to validate the user.

# JSON Web Token

JSON Web Token is a long string that identifies a user. (As a metaphor, we can think of it as our driver's license.)

When the user logs in, the server generates the JSON Web Token. We give it to the client. And then, every time the client reaches the API endpoints, they should show their JWT token (_driver's license_) to validate.

JWT tokens have 3 parts: **Header, Payload**, and **Digital Signature**.

In JWT, payloads include the public properties (data) about the user.

<img src="./Images/image-11.png" width="600">

### Real World Scenario

**Q** - Is the above scenario secure? Anyone can set themselves as admin and they will be treated as admins?

**Answer -**

But that is not how JWT works. The **third par**t of JWT (digital signature) is created based on the content of the JSON Web Token along with a secret or private key. This **secret or private key** is stored on the server.

So, if a malicious user gets the JWT and modifies the `admin` field to `true`, then the digital signature will be **invalid**, because the content of the JWT was modified. Now they would need a new digital signature. **But the hacker can't generate the new digital signature** because they don’t have access to the private key on the server.

So, when they send the new **tampered JWT**, the server will decline that.

# Storing Secrets in Environment Variables

There are two main methods to store secrets in an application:

#### 1. Using dotenv:

Secrets are stored in a .env file, which is loaded into environment variables when the app starts.

#### 2. Using configuration files:

When using config files, there are two approaches:

- Storing secret values directly inside the config file.

- Setting secret values through environment variables, which can be done either by:

  - Manually setting them in the terminal before running the app (need to set these environment variables manually every time before running the app, which can be repetitive and inconvenient),

  - Loading them from another .env file.

Using dotenv is easy and convenient for **managing secrets locally**. However, configuration files help organize and manage settings **more effectively across different environments** (such as development, testing, and production).

**Note:** Once you call `require("dotenv").config()`; in your main entry file (e.g., index.js), all environment variables from the .env file are loaded into process.env, and you can access them from any other file in the project.

# Setting Response Headers

When we use custom headers in our response, we often prefix them with **`x-`**, like `x-auth-token`.

This was required in the past, but now it's not necessary. Still, many developers and companies continue to use it out of habit and for consistency.

# Encapsulating Logic in mongoose.

We should move the `generateAuthToken` function to one place. The easiest way might seem like creating a separate function in another file and passing the necessary parameters to it. But **that's not a good design**.

In programming, there's a principle called the **Information Expert Principle**. This means we should assign responsibility to the part of the system that has the necessary information and knows how to do the task. (Just like in a restaurant — only the _chef_ cooks, because they have the knowledge and skills. A _waiter_ shouldn't do the cooking.)

So in our case, to generate a JWT, we need **user data**. And only the **User model** has that data. That's why the `generateAuthToken` function should stay in the User model — it's the right place according to the principle.

---

### Explanation of `userSchema.methods.generateAuthToken = function () { ... }`

This line adds a method to the **user schema**. Any document (user instance) created from this schema will have this method available.

This is a regular function (not an arrow function!) because it uses `this`. Inside the function, this refers to the **individual user document** (e.g., a user from the database)

---

**Q** - What happens if you use an arrow function for a Mongoose method?

**A** - In **arrow functions**, `this` is **not bound to the object** that calls the method.Instead, `this` refers to the **outer scope**/ parent (in this case, likely the global object or the module scope).So `this._id` will be `undefined`, and your JWT will fail or include `undefined` as `_id`.

---

**Q** - If `userSchema` doesn’t have `_id`, how does `this._id` work in the method?

**A** - Mongoose automatically adds an \_id field to every schema by default. (Every document in MongoDB must have a unique `_id`. Mongoose includes this field for you — you don’t need to define it manually)

# Logging out

When loggong out, we donlt need to creeat a seperate router, Because we don't store the toke(access token) in the server / db. So for loghout feature , simple in teh client side, we dlete the token form the client ( loocla strage o r where it is stired)

Note - We should not stoire any token( especiually we shoudl not store the accces stoken, abECAUS ETEH CLIENT GET IT, THEY CNA PERFORM THE ACTION BEHALF OF THE. sO ACCESS TOKEN SHGOUEL BE SHORT LIEV AND SHOUEL NOT STOIRED IN THE DB)

---

When using refresh tokens, there are two common ways to create them.

## 1. Using JWT refresh tokens

- The refresh token is a **JWT token** containing user ID and expiration time.

- You **do NOT store the refresh token in the database**.

- When the client sends the refresh token:

  - The server validates the token using the secret key.

  - Extracts the user ID from the token payload.

  - If valid, issues a new access token for that user.

## 2. Using random string refresh tokens

- The refresh token is a **randomly generated string**.

- Before storing it in the database, you **hash the token** (e.g., with SHA-256).

- You store the **hashed token and expiration time** in the database.

- You send the **plain (original) token** to the client.

- When the client sends the refresh token back:

  - The server hashes the received token the same way.

  - Searches the database for the hashed token.

  - If found and valid and didn't expired, it identifies the user and issues a new access token.

For **password hashing**, we use a **different random salt for each password**. This salt is stored along with the hashed password. When a user tries to log in, we** first extract the salt from the stored hashed password**, then rehash the entered plain password using that same salt. If the resulting hash matches the stored one, the password is correct. This approach ensures that even if two users have the same password, their stored hashes will be different due to different salts, making it more secure.

For **refresh tokens**, we usually don't use a random salt. The refresh token itself is a **random high-entropy string**, so just hashing it (e.g., using SHA-256) is typically enough. When we receive the refresh token from the client, we **hash it using the same hashing method**, and compare it with the stored hashed token in the database. **If the one of hashed token in the database matches the newly hashed token** from the client, and it is not expired, then the token is valid(using that, we can identify who is the user and can generate a new access token). [ For extra security, we can use a **fixed secret salt** (e.g., from a .env file) and include it in the hashing process — this way, even if someone gets access to the plain token, they can’t reverse-engineer the hash without the server's secret. ]

My method - uses a JWT method for refresh token, then we don’t need to store anything in DB.

Logout – If we use a JWT for the refresh token, we only need to delete it from the client side. But if we use a random string, we must delete the token and its expiry data from the database during logout.

---

If the CSRF token is stored in a cookie, the browser automatically includes it with every request to the server. In this case, the client **does not need to manually add the token** to the request — the browser handles sending the cookie for you.
