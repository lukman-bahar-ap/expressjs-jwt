const sequelize = require('../../config/db');

const db = {};

sequelize.sync({ alter: true, force: false }).then(() => {
  console.log('Database Configured');
  console.log('All models were synchronized successfully.');
});

module.exports = db;
