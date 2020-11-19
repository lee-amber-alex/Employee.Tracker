const inquirer = require("inquirer");
const mysql = require("mysql");


// create database connection

// make database connection
    //   when connected start inquirer

    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "new_password",
        database: "cms_DB"
      });
      
      connection.connect(function(err) {
        if (err) throw err;
        start();
      });
      
function start() {
    
};