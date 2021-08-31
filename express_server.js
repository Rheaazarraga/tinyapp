const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");


const generateRandomString = function () {
  return (Math.random() + 1).toString(36).substr(6);
};

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true})); //added this & line 13 because bodyParser kept deprecating
app.use(express.json())


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca", //shortURL : longURL
  "9sm5xK": "http://www.google.com",
};

//GET ROUTE HANDLERS

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  // ':' indicates the ID is a route parameter
  let shortURL = req.params.shortURL;
  let longURL = urlDatabase[shortURL];
  const templateVars = { longURL: longURL, shortURL: shortURL };
  res.render("urls_show", templateVars);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

//PORT LISTENER

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
