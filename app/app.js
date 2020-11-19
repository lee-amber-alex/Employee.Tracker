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
  inquirer
    .prompt({
      name: "addInfo",
      type: "list",
      message: "What would you like to do?",
      choices: [
        { name: "Add Department", value: addDep},
        { name: "Add Role", value: addRole},
        { name: "Add Employee", value: addEmp},
        { name: "View Department", value: viewDep},
        { name: "View Employee", value: viewEmp},
        { name: "Update Employee", value: updateEmp},
      ],
    })
    .then(function(answer) {
   
    });
}

function addDep(){};
function addRole(){};
function addEmp(){};
function viewEmp(){};
function updateEmp(){};

