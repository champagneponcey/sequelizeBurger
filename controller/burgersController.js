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

// post route -> create burgers
router.post("/burgers/create", function(req, res) {
    // takes the request object using it as input for burger.addBurger
    db.Burger.create({
        burger_name: req.body.burger_name
    })
    // pass call result
    .then(function(dbBurger) {
        // log result to bash
        console.log(dbBurger);
        // redirect page
        res.redirect("/");
    });
});

// put route -> to devour
router.put("/burgers/update", function(req, res) {
    // if customer name is given then we will create the customer and have them devour it
    if (req.body.customer) {
        db.Customer.create({
            customer: req.body.customer,
            BurgerId: req.body.burger_id
        })
        .then(function(dbCustomer) {
            return db.Burger.update({
                devoured: true
            }, {
                where: {
                    id: req.body.burger_id
                }
            });
        })
        .then(function(dbBurger) {
            res.redirect("/");
        });
    }
    // if no customer, update burger only
    else {
        db.Burger.update({
            devoured: true
        }, {
            where: {
                id: req.body.burger_id
            }
        })
        .then(function(dbBurger) {
            res.redirect("/");
        });
    }
});

module.exports = router;