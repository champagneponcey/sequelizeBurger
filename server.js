// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var Sequelize = require('sequelize');
var sequelize = new Sequelize('burgers', 'mv85xtpjm3fp3stm', 'mv85xtpjm3fp3stm');

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 5000;
var app = express();

var db = require('./models');

app.set('port', PORT);
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
// parse application/x-www-form-urlencoded
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgersController.js");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port:%s" + PORT);
    });
});
