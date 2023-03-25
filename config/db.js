const Sequelize = require('sequelize');
const dbConfig = require('./config.json');

const ENV = process.env.NODE_ENV || 'development';
const CONFIG = dbConfig[ENV];

const sequelize = new Sequelize(CONFIG.database, CONFIG.username, CONFIG.password, {
  host: CONFIG.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
// pool is optional, it will be used for Sequelize connection pool configuration:
// max: maximum number of connection in pool
// min: minimum number of connection in pool
// idle: maximum time, in milliseconds, that a connection can be idle before being released
// acquire: maximum time, in milliseconds, that pool will try to get connection before throwing err

module.exports = sequelize;
