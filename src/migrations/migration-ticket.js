'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Ticket', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tenGhe: {
                type: Sequelize.STRING
            },
            trangThai: {
                type: Sequelize.BOOLEAN
            },
            toa: {
                type: Sequelize.STRING
            },
            giaVe: {
                type: Sequelize.INTEGER
            },
            userdatve: {
                type: Sequelize.INTEGER
            },
            /*userdatve: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'Inforbookers',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },*/
            trainId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Ticket');
    }
};