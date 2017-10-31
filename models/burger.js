// Burger models

// The burger has a burger_name attribute of type DataTypes.String
// and a devoured attribute that is false by default

// define dependencies
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sequelizeBurger_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
});

module.exports = function(Sequelize, DataTypes) {
    var Burger = Sequelize.define("Burger", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        updateBurger: {
            type: Sequelize,
            allowNull: false
        }
    });

    Burger.associate = function(models) {
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            },
            
        });
    };

    return Burger;
};