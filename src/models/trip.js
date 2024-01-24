'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Trip.hasMany(models.Ticket, { foreignKey: 'trainId', as: 'tickets' });
        }
    };
    Trip.init({
        // id: DataTypes.INTEGER,
        diemXuatPhat: DataTypes.STRING,
        diemDen: DataTypes.STRING,
        thoiGianDi: DataTypes.DATE,
        thoiGianDen: DataTypes.DATE,
        giaVe: DataTypes.INTEGER,
        tenTau: DataTypes.STRING,
        soToa: DataTypes.INTEGER,
        soGhe: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Trip',
    });
    return Trip;
};