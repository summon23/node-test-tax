'use strict';

module.exports = function (sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        id: { type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        name: { type: DataTypes.STRING(40) },
        tax_code: { type: DataTypes.ENUM('1', '2', '3') },
        price: { type: DataTypes.STRING(10) },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'product',
        freezeTableName: true,
        underscored: true
    });

    Product.sync({
        force: false
    });

    return Product;
}