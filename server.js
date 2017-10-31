// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequelizeBurger_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
});
const routes = require("./controller/burgersController");

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 7000;
var app = express();

var db = require('./models');

// app.set('port', PORT);
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
// parse application/x-www-form-urlencoded
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
app.use("/", routes);
// app.use("/update", routes);
// app.use("/create", routes);

// test sequelize to see if it is working
// =============================================================
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port: " + PORT);
    });
});
