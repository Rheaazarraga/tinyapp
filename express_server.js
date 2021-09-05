const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const {
  getUserByEmail,
  urlsForUser,
  generateRandomString,
} = require("./helper_funcs");

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// FEED DATA

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "userRandomID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "user2RandomID" },
};

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "$2b$10$0J4eqL5cPAoGOZGI/VnSo./dw7PDAxOtG31SSWKn7s3M7YVTMXvaC", //password "123",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "$2b$10$g1Eh4pYUfDbmih9/yEVa3OOrTVNgG1BLSJ3xXNs8nd0YVV9dkZJTu", //password "lol",
  },
};

//GET ROUTE HANDLERS

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// Temporary endpoint to visually view the current urlDatabase

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// Temporary endpoint to visually view the current users

app.get("/users.json", (req, res) => {
  res.json(users);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlsForUser(urlDatabase, req.session.userID),
    userID: req.session.userID,
    user: users[req.session.userID],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/login");
  }
  const templateVars = {
    userID: req.session.userID,
    user: users[req.session.userID],
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  if (!urlDatabase[shortURL]) {
    const templateVars = {
      user: users[req.session.userID],
      error: "This is not a valid link!",
    };
    return res.status(403).render("errors", templateVars);
  }
  if (req.session.userID !== urlDatabase[shortURL].userID) {
    const templateVars = {
      user: users[req.session.userID],
      error: "Oops! You are not authorized to edit this!",
    };
    res.status(403).render("errors", templateVars);
  }
  const longURL = urlDatabase[shortURL].longURL;
  const templateVars = {
    longURL: longURL,
    shortURL: shortURL,
    user: users[req.session.userID],
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

app.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.session.userID],
  };
  res.render("user_registration", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = {
    userID: null,
    user: users[req.session.userID],
  };
  res.render("user_login", templateVars);
});

app.get("*", (req, res) => {
  const templateVars = {
    user: users[req.session.userID],
    error:
      "Status 404: This page does not exist!  Please click one of the links above!",
  };
  return res.status(404).render("errors", templateVars);
});

// POST ROUTE HANDLERS

app.post("/urls", (req, res) => {
  if (!req.session.userID) {
    return res.redirect("/login");
  }
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = { longURL: longURL, userID: req.session.userID };
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  if (req.session.userID === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
    res.redirect("/urls/");
  } else {
    const templateVars = {
      user: users[req.session.userID],
      error: "You are not authorized to delete this",
    };
    return res.status(400).render("errors", templateVars);
  }
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const shortURL = req.params.shortURL;
  if (req.session.userID !== urlDatabase[shortURL].userID) {
    return res.send("You are not authorized to edit this");
  }
  urlDatabase[shortURL].longURL = req.body.newURL;
  res.redirect("/urls/");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userID = getUserByEmail(email, users);
  if (!email || !password) {
    const templateVars = {
      user: users[req.session.userID],
      error: "Status 400: You have left a field empty",
    };
    return res.status(400).render("errors", templateVars);
  }
  if (!userID) {
    const templateVars = {
      user: users[req.session.userID],
      error: "An account does not exist!",
    };
    return res.status(403).render("errors", templateVars);
  }
  if (!bcrypt.compareSync(password, users[userID].password)) {
    const templateVars = {
      user: users[req.session.userID],
      error: "You have entered the wrong password.",
    };
    return res.status(403).render("errors", templateVars);
  }
  req.session.userID = userID;
  return res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  if (!req.body.email || !req.body.password) {
    const templateVars = {
      user: users[null],
      error: "The email or password was left empty. Please try again.",
    };
    return res.status(403).render("errors", templateVars);
  }

  const userID = getUserByEmail(email, users);
  if (userID) {
    const templateVars = {
      user: users[null],
      error: "The account already exists.",
    };
    return res.status(400).render("errors", templateVars);
  }

  const ID = generateRandomString();
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  users[ID] = {
    id: ID,
    email: req.body.email,
    password: hashedPassword,
  };
  req.session.userID = ID;
  res.redirect("/urls");
});

//PORT LISTENER

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
