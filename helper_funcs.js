// HELPER FUNCTIONS:

//Checks if email exists is in the userDatabase
const getUserByEmail = function (email, users) {
  for (const userID in users) {
    if (users[userID].email === email) {
      return userID;
    }
  }
  return;
};

//Helper function which returns urls where the userID is equal to the id of the currently logged in user
const urlsForUser = function (urlDatabase, userID) {
  const filteredURLS = {};
  for (let shortURL in urlDatabase) {
    if (userID === urlDatabase[shortURL].userID) {
      filteredURLS[shortURL] = urlDatabase[shortURL];
    }
  }
  return filteredURLS;
};

//Generates a random alphanumeric string for userIDs & shortURLs 
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

//EXPORT
module.exports = { 
  getUserByEmail,
  urlsForUser,
  generateRandomString,
};