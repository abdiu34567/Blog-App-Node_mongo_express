const http = require("http");

const express = require("express");
const console = require("console");

const app = express();

const mongoose = require("mongoose");

// mongodb+srv://Dawit:abdi@cluster0.ujgyp.mongodb.net/test

mongoose.connect(
  "mongodb+srv://Dawit:abdi@cluster0.ujgyp.mongodb.net/my_database",
  {
    useNewUrlParser: true,
  }
);

const expressSession = require("express-session");

app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

const ejs = require("ejs");
app.set("view engine", "ejs");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const flash = require("connect-flash");
app.use(flash());

// any request ask for asset should get it from the 'public' directory
app.use(express.static("public"));

const newPostController = require("./controllers/newPost");

const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

const validateMiddleware = require("./middleware/validationMiddleware");

const newUserController = require("./controllers/newUser");

const storeUserController = require("./controllers/storeUser");

const loginController = require("./controllers/login");

const loginUserController = require("./controllers/loginUser");

const authMiddleware = require("./middleware/authMiddleware");

const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("App listening on port 3000");
});

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.get("/", homeController);

app.get("/post/:id", getPostController);

app.post("/posts/store", authMiddleware, storePostController);

// if not authenticated never allow hin to post
app.get("/posts/new", authMiddleware, newPostController);

// if authenticated never allowed to see login/register page
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

const logoutController = require("./controllers/logOut");

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/logout", logoutController);

// check every registered routes and if there is no matched up then it will render "notfound" page
app.use((req, res) => res.render("notfound"));
