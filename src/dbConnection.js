const {Sequelize} = require('sequelize');
require('dotenv').config();

const config = {
    username:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "0.0.0.0",
    port:5432,
    dialect: "postgres",
    dialectOptions: {
        timezone: "utc"
    },
    logging: true,
    omitNull: false
}

let sequelize = new Sequelize(process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    config);

    sequelize
    .authenticate()
    .then(function(){
        console.log("Connection successful");
    })
    .catch(function(error){
        console.log("Unable to connect", error.message);
    });

module.exports = {
    sequelize
}
