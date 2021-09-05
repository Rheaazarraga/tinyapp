const { assert } = require("chai");
const {
  getUserByEmail,
  urlsForUser,
  generateRandomString,
} = require("../helper_funcs.js");

const testUsers = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "123",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "lol",
  },
  newUser: {
    id: "newUser",
    email: "newuser@example.com",
    password: "bita-is-baby",
  },
};

const testUrlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "userRandomID" },
  "9sm5xK": { longURL: "http://www.google.com", userID: "user2RandomID" },
  "Sa4H9a": { longURL: "http://www.espn.com", userID: "userRandomID" }
};


describe("getUserByEmail", () => {
  it("should return a user with valid email", function() {
    const user = getUserByEmail("user@example.com", testUsers);
    const expectedOutput = "userRandomID";
    // Write your assert statement here
    assert.strictEqual(user, expectedOutput);
  });

  it('should return undefined with an invalid email', function() {
    const user = getUserByEmail("use@example.com", testUsers);
    // Write your assert statement here
    assert.isUndefined(user);
  });

});

describe("urlsForUser", () => {
  it("should return an object containing the urls associated with the user ID", function() {
    const urls = urlsForUser(testUrlDatabase,"userRandomID");
    const expectedOutput = {
      b2xVn2: {
        longURL: "http://www.lighthouselabs.ca",
        userID: "userRandomID",
      },
      Sa4H9a: { longURL: "http://www.espn.com", userID: "userRandomID" },
    };
    // Write your assert statement here
    assert.deepInclude(urls, expectedOutput);
  });

  it("should return an empty object with an id that has no urls attched to it", function() {
    const urls = urlsForUser("newUser", testUrlDatabase);
    const expectedOutput = {};
    // Write your assert statement here
    assert.deepInclude(urls, expectedOutput);
  });
});

describe('generateRandomString', () => {
  it('should return an alphanumeric string length of 6', function() {
    const randomString = generateRandomString();
    const expectedOutput = 6;
    // Write your assert statement here
    assert.strictEqual(randomString.length, expectedOutput);
  });
});