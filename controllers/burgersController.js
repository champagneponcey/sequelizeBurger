// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// ==================================================
var express = require("express");

var router = express.Router();
// grabbing our models
var burger = require("../models");

// get route -> index
router.get("/", function(req, res) {
    // sends to next get function
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    db.Burger.findAll({
        include: [db.Customer],
        //specify want to return burgers in ordered by ascending burger_name
        order: [
            ["burger_name", "ASC"]
        ]
    })
    // use promise method to pass burgers...
    .then(function(dbBurger) {
        // main index, update page
        var hbsObject = {
            burger: dbBurger
        };
        res.render("index", hbsObject);        
    });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
    // takes the request object using it as input for buger.addBurger
    burger.create(req.body.burger_name, function(result) {
        // wrapper for orm.js that using MySQL insert callback will return a log to console,
        // render back to index with handle
        console.log(result);
        res.redirect("/");
    });
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
    burger.update(req.body.burger_id, function(result) {
        // wrapper for orm.js that using MySQL update callback will return a log to console,
        // render back to index with handle
        console.log(result);
        res.redirect("/");
    });
});

module.exports = router;