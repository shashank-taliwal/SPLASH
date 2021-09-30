const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const port = process.env.PORT || 3000 ;
const homeStartingContent =
  "This blogging website is your own personal notebook which can be used for spilling your heart out and relax! it is absolutely safe!!";
const aboutContent =
  "This blogging website was made by Shashank Taliwal. I am a Computer Science undergrad at Institute of Engineering and Technololgy, Lucknow.";
const contactContent =
  "For any queries you can mail me at shashanktaliwal07@gmail.com";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutInfo: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactInfo: contactContent,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.blogTitle,
    body: req.body.blogBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("Post", {
        title: post.title,
        content: post.body,
      });
    }
  });
});
app.listen(port, function () {
  console.log("Server started on port"+port);
});
