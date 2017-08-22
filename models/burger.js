// var orm = require("../config/orm.js");


module.exports = function(sequelize, DataTypes) {
        var Burger = sequelize.define("Burger", {
                all: {

                },
                create: {

                },
                update: {

                }
            }
        };

        Burger.sync();