# TinyApp Project
---
TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Purpose
---
This project by [Rhea Azarraga](https://github.com/Rheaazarraga) is created as part of the [Lighthouse Labs](https://github.com/lighthouse-labs) curriculum. It is not intended for professional use.

## Final Product
---
![registertiny](https://user-images.githubusercontent.com/84409001/132153576-74b3b999-78cb-41f9-b50a-771d42d26e86.png)

![logintiny](https://user-images.githubusercontent.com/84409001/132153615-03741202-370e-4e3e-b068-36537f700148.png)

![myurlstiny](https://user-images.githubusercontent.com/84409001/132153641-42073bec-bd98-449b-88a7-f425ff75531f.png)

![nourlstiny](https://user-images.githubusercontent.com/84409001/132153653-fed141f0-4e39-48e2-b2f9-76f180c37205.png)

![oopstiny](https://user-images.githubusercontent.com/84409001/132153674-ab19e2eb-d787-40ed-897c-5a50a0a1b580.png)

## Dependencies
---
- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Dev Dependencies
---
- Mocha
- Chai
- Nodemon

## Getting Started
---
- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

## File Structure & Description 
---
###  <u> Server Directory </u> 
#### [**express_server.js**](https://github.com/Rheaazarraga/tinyapp/blob/master/express_server.js): 
* Contains all routing to endpoints with a path of /urls, user entry point (register, log in & log out)
*Requires all dependencies needed for the project. 
* Sets up EJS as the app's view engine.

#### [**helper_funcs.js**](https://github.com/Rheaazarraga/tinyapp/blob/master/helper_funcs.js):
* Contains various modules serving as helper functions for the project.
* Helper functions include:
    * generateRandomString(): generates a random alphanumeric string for a users short URL and userID.
    * getUserByEmail(email, users): Checks if email exists is in the userDatabase and returns that users ID if it exists.
    * urlsForUser(urlDatabase, userID): returns an array of objects containing a list of the user's long URL's and corresponding short URL's. 

### <u> Views Directory </u> 

#### [**_header.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/master/views/partials/_header.ejs)
* Site header template
#### [**urls_index.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/feature/user-registration/views/urls_index.ejs)
* Collection of URL's EJS template
#### [**urls_show.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/feature/user-registration/views/urls_show.ejs)
* Update an existing URL EJS template
#### [**urls_new.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/feature/user-registration/views/urls_new.ejs)
* Create a new URL EJS template
#### [**user_registration.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/feature/user-registration/views/user_registration.ejs)
* Registration EJS template
#### [**user_login.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/feature/user-registration/views/user_login.ejs)
* Log In EJS template
#### [**errors.ejs**](https://github.com/Rheaazarraga/tinyapp/blob/master/views/errors.ejs)
* Error EJS template


###  <u> Test Directory </u>
#### [**helperTest.js**](https://github.com/Rheaazarraga/tinyapp/blob/master/test/helperTest.js)
* Contains TDD unit tests for helpers functions

