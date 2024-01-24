'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class unicode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    unicode.init({
        coDau: DataTypes.STRING,
        khongDau: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'unicode',
    });
    return unicode;
};