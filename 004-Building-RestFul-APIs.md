# Nodemon

Nodemon is used to automatically restart the application when file changes are detected.

To run the app using Nodemon, use the command: `nodemon index.js`

# Environmental Variables

About Port Number – When we deploy our application to a hosting environment, the port is dynamically assigned by the hosting environment.

Typically, in a hosting application for a Node environment, there is an environment variable called `PORT`. An **environment variable** is basically a variable that is part of the environment in which a process runs. Its value is set outside the application.

To read the `PORT` variable, we have to use the `process` object. We have this global object called `process`, and it has a property called `env`, which is short for environment variables. Using this, we can read the port value.

---

In Windows, if we need to change the environment variable for a variable like PORT, we can set it using the terminal:

```BASH
set PORT=5000
```

Now, process.env.PORT will return 5000.
