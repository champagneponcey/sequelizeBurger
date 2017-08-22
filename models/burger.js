// var orm = require("../config/orm.js");

var Burger = sequelize.define("Burger", {
            all: function(cb) {

            },
            create: function(name, cb) {

            },
            update: function(id, cb) {
                var condition = "id=" + id;

            }
        };

        Burger.sync();

        module.exports = Burger;