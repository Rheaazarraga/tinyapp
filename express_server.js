const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");


const generateRandomString = () => {
  let randomString = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const stringLength = 6;
  for (let i = 0; i < stringLength; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  return randomString;
};

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true})); //added this & line 13 because bodyParser kept deprecating
app.use(express.json());


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
  let shortURL = generateRandomString();
  let longURL = req.body.longURL;
  //console.log(longURL);
  urlDatabase[shortURL] = longURL; //adding new entry to the array?? with an index of shortURL and value of longURL
  //console.log(urlDatabase);  // Log the POST request body to the console
  res.redirect(`/urls/${shortURL}`); //making get request
  //res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL/delete", (req, res) => {
  let shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls/");
});

app.post("/urls/:shortURL/update", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = req.body.newURL;
  res.redirect("/urls/");
});

app.get("/u/:shortURL", (req, res) => { //  anything /u is anything the user types which we will save in req.params : means its unique - comes back as the key
  const shortURL = req.params.shortURL;
  //console.log(shortURL);
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
  //console.log(req.params);
});

//PORT LISTENER

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});