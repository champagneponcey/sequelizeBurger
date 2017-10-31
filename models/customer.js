// customer model

// attribut of datatype string

var Sequelize = require('sequelize');
var sequelize = new Sequelize('burgers_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
});

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Customer;
};