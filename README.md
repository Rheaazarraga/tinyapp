# TinyApp Project
---
TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Purpose
---
This project by [Rhea Azarraga](https://github.com/Rheaazarraga) is created as part of the [Lighthouse Labs](https://github.com/lighthouse-labs) curriculum. It is not intended for professional use.

## Final Product


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

