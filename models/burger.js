// var orm = require("../config/orm.js");


module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        all: {
            type: DataTypes.STRING,
            allowNull: false
        },
        create: {
            type: DataTypes.STRING,
            allowNull: false
        },
        update: {
            type: DataTypes,
            allowNull: false
        }
    });
    Burger.sync();
};