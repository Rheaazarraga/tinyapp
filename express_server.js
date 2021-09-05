
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieSession = require('cookie-session')

const generateRandomString = () => {
  let randomString = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const stringLength = 6;
  for (let i = 0; i < stringLength; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  return randomString;
};

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({
  name: "session",
  keys: ['key1', 'key2']
}));

// FEED DATA

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "userRandomID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "user2RandomID" },
};

//helper function which returns urls where the userID is equal to the id of the currently logged in user

const urlsForUser = function(userID) {
  const filteredURLS = {};
  for (let shortURL in urlDatabase) {
    if (userID === urlDatabase[shortURL].userID) {
      filteredURLS[shortURL] = urlDatabase[shortURL];
    }
  }
  return filteredURLS;
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
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// temporary endpoint to visually view the current urlDatabase

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// temporary endpoint to visually view the current users

app.get("/users.json", (req, res) => {
  res.json(users);
});

app.get("/urls", (req, res) => {
  if (!req.session.userID) {
  }
  const templateVars = {
    urls: urlsForUser(req.session.userID),
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
      error: "Oops! You are not authorized to edit this!"
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

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

app.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.session.userID]
  };
  res.render("user_registration", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = {
    userID: null,
    user: users[req.session.userID]
  };
  res.render("user_login", templateVars);
});


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
      error: "You are not authorized to delete this"
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
  for (const user in users) {
    if (users[user].email === email) {
      if (bcrypt.compareSync(password, users[user].password)) {
        req.session.userID = user;
        return res.redirect("/urls");
      } else {
        const templateVars = {
          user: users[req.session.userID],
          error: "You have entered the wrong password."
        };
        return res.status(403).render("errors", templateVars);
      }
    }
  }
  const templateVars = {
    user: users[req.session.userID],
    error: "Status: 403 An account does not exist"
  };
  return res.status(403).render("errors", templateVars);
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
      error: "The email or password was left empty. Please try again."
    };
    return res.status(403).render("errors", templateVars);
  }
  for (const user in users) {
    if (users[user].email === email) {
      const templateVars = {
        user: users[null],
        error: "The account already exists."
      };
      return res.status(400).render("errors", templateVars);
    }
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