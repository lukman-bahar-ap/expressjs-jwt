const sequelize = require('../../config/db');

const db = {};

sequelize.sync({ alter: true });

console.log('All models were synchronized successfully.');

module.exports = db;
