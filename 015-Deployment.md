# Introduction

We have two options for deploying a Node.js application:

1. PaaS (Platform as a Service)
2. Docker

### 1. PaaS

A Platform as a Service provider is a great option if you don't want to deal with infrastructure. If you prefer not to worry about servers, load balancers, reverse proxies, or restarting your application after a crash, then PaaS is the best choice. There are several PaaS options available, such as Heroku, Google Cloud Platform, AWS, and Azure.

### 2. Docker

If you need more control over your deployment, or if you want to deploy the application to your own web servers, then Docker is a great option.
With Docker, you can easily create an image of your application and deploy it anywhere — making deployment consistent and portable.

# Preapring the App Production

Before we start with deployment, we should prepare our application for production.

We need to install a couple of packages:

- **helmet** – Helmet is a middleware package that helps protect our application from well-known web vulnerabilities by setting various HTTP headers.
- **compression** – This package is used to compress HTTP responses sent to the client, which helps improve performance by reducing the size of the data being transferred.
