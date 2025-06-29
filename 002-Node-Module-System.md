In this section, we explore a few modules that are built into the core of Node.js, such as `os` (Operating System), `fs` (File System), `events`, and `http`.

# Global Object

We can use `console.log` function to log something on console. This `console` is a global object, which means we can access it in any file.

We have other functions that are globally available in Node such as `setTimeout`, `clearTimeout`, `setInterval`, and `clearInterval`. There are some global objects that we learn later (os, path, etc...).

In **browser**, we have this **`window object`** that represents the global scope. So all the variables and functions we define globally can be accessed via this `window` object. (So we can call `window.console.log()` or simply `console.log()`. JavaScript engine will prefix this with `window.` because that is where this function is defined. All the above functions mentioned can be defined the same way – `window.setTimeout()` or directly.)

Also, if we define a variable like `var message = ""`, that will also be available(added) in the window object.

(Extra - With the introduction of ES6, _let_ and _const_ were added — and unlike var, they do not get added to the global object (like window in the browser), even if declared in the global scope. However, variables declared with **var** do get added to the global object, but only if they are declared in the global scope. If var is declared inside a function, it will not be added to the global object.)

However, in **Node**, we don't have the `window object` — we have the **`global object`**. So all the above functions can be accessed through the global object: `global.console.log()` or `global.setTimeout()`

But one thing: the _variables_ (`var message`) and _functions_ we define — those will **not** be added to the global object.
They are only scoped to the file.

This is because Node uses a **modular system**.

# Modules

In **Node**, if we have two functions with the same name in two different files, and if they are automatically added to the global object, the new definition will override the previous one. This is the problem with global objects.

In order to build reliable applications, we should avoid defining variables and functions in the global scope. Instead, we need **modularity**.

So, in the core of Node.js, we have the concept of **modules**. Every file in a Node application is considered a **module**. The variables or functions we define in that file (or module) are scoped **only to that file**.(In OOP terms, they are **private**.)

If we want to use a function or variable **outside of that module**, we need to **explicitly export** it to make it **public**.

We can see the module information in a file using: `console.log(module);`
