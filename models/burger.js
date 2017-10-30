// var orm = require("../config/orm.js");


module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        showAll: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createBurger: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updateBurger: {
            type: Sequelize,
            allowNull: false
        }
    });

    Burger.sync({ force: false })
        .then(() => {
            // table created
            return Burger.create({
                showAll: [],
                createBurger: '',
                updateBurger: ''
            });
        });
};