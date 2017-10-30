// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

const routes = require("./controller/burgersController");

// Sets up the Express App
// =============================================================
var app = express();

// add models
var db = require('./models');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
// parse application/x-www-form-urlencoded
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
    defaultLayout: "main" 
}));
app.set("view engine", "handlebars");

// Routes
// =============================================================
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

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

// listen on port 5000
var PORT = process.env.PORT || 5000;
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port: " + PORT);
    });
});
