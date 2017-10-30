// customer model

// attribut of datatype string

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Customer;
};