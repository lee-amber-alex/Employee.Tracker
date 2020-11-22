const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "new_password",
//   database: "cms_DB",
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   start();
// });

function start() {
  inquirer
    .prompt({
      name: "addInfo",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Employee",
        "View Roles",
        "Update Employee",
        "Exit",
      ],
    })
    .then((answer) => {
      console.log(answer);

      switch (answer.action) {
        case "Add Department":
          addDep();

          break;

        case "Add Role":
          addRole();

          break;

        case "Add Employee":
          addEmp();

          break;

        case "View Employee":
          viewEmp();

          break;

        case "View Role":
          viewRole();

          break;
        case "View Department":
          viewDep();

          break;

        case "Update Employee":
          updateEmp();

          break;

        case "Exit":
          connection.end();

          break;
      }
    });
}

function addDep() {
  inquirer
    .prompt({
      name: "addDep",
      type: "input",
      message: "What Department would you like to add?",
    })
    .then(function (answer) {
      console.log(answer);
      console.log("It worked!");
      connection.query(
        "INSERT INTO department SET ?",
        {
          dep_name: answer.addDep,
        },
        function (err) {
          if (err) throw err;
          console.log("Department created.");

          start();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt({
      name: "addRole",
      type: "input",
      message: "What Position would you like to add?",
    })
    .then(function (answer) {
      console.log(answer);
      console.log("It worked!");
      connection.query(
        "INSERT INTO roles SET ?",
        {
          roles: answer.addRole,
        },
        function (err) {
          if (err) throw err;
          console.log("Role created.");

          start();
        }
      );
    });
}
function addEmp() {
  inquirer
    .prompt({
      name: "addEmp",
      type: "input",
      message: "What Employee would you like to add?",
    })
    .then(function (answer) {
      console.log(answer);
      console.log("It worked!");
      connection.query(
        "INSERT INTO employees SET ?",
        {
          full_name: answer.addEmp,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added.");

          start();
        }
      );
    });
}
function viewDep() {
  inquirer
    .prompt({
      name: "viewDep",
      type: "input",
      message: "Which Department would you like to view?",
    })
    .tthen(function (answer) {
      connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
      });
    });
}
function viewEmp() {
  inquirer
    .prompt({
      name: "viewEmp",
      type: "input",
      message: "Which Employee would you like to view?",
    })
    .then(function (answer) {
      connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
      });
    });
}
function viewRole() {
  inquirer
    .prompt({
      name: "viewRole",
      type: "input",
      message: "Which Employee would you like to view?",
    })
    .then(function (answer) {
      connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
      });
    });
}
function updateEmp() {
  inquirer
    .prompt({
      name: "updateEmp",
      type: "input",
      message: "Which Employee would you like to update?",
    })
    .then(function (answer) {
      connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        // connection.query(
        //   "UPDATE auctions SET ? WHERE ?",
      });
    });
}

start();
