const Sequelize = require('sequelize');

require('dotenv').config();
// db connection
const{DB_USER, DB_HOST, DB_PORT, DB_DIALECT, DB_NAME, DB_PASSWORD} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

// TEST DB CONNRCTION
async function testDB(){
    try {
        await sequelize.authenticate();
        console.log('connection has been established successfully')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDB();

module.exports = sequelize;