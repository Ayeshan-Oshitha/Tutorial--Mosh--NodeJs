**Node Package Manager** (NPM) is a command-line tool as well as a registry(online database) of 3rd party libraries we can add to our applications.

We can see those packages on the npmjs website. We can install Node modules via a command-line tool also called npm (Node Package Manager).

Why NPM is considered as a CLI as well as registry ?

- The **tool you use locally** to manage packages (the CLI) (_npm install, npm update_)
- The **online service** that hosts the packages (the registry).

# Package.json

The **package.json** file is a basic file that contains information about the project. It is basically a bunch of metadata.

All Node.js applications have this package.json file. To create a package.json file, we can use the command `npm init`.

Also, if we want to create a package.json file without answering all the questions, we can use `npm init --yes`.

# Installing a Node Package

We can install a package using `npm install <package-name>`, and then it will be stored in a folder called **node_modules**.

When we add a Node package, it will automatically be added to the package.json file.

Every Node module has its own package.json file inside the node_modules folder.

# Using a package

When we want to use a package in Node.js, we include it using the `require` function.

This is how `require` resolves the required modules:

1. First, it checks whether the module is a core module in Node (like `os, path`).
2. Then it assumes it is a file or folder (if we add the `./`).
3. Then it assumes that it is a module in the `node_modules` folder.
