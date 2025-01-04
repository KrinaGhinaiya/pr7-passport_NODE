const express = require('express');
const path = require('path')
const port = 2612;
const app = express();
const db = require("./config/db");
const cookieparser = require('cookie-parser');
const session = require('express-session');

const passport = require("passport");
const localSt = require("./config/passportLocalStrategy");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded());
app.use(cookieparser());

app.use(session({
    name: 'learning',
    secret: "learning",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setLocalUser)

app.use('/', require('./routes/blogRoutes'));
app.use('/', require('./routes/authRoutes'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server Start at http://localhost:${port}`);
})