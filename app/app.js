const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "new_password",
  database: "cms_DB",
});

connection.connect(function (err) {
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
        { name: "Add Department", value: addDep },
        { name: "Add Role", value: addRole },
        { name: "Add Employee", value: addEmp },
        { name: "View Department", value: viewDep },
        { name: "View Employee", value: viewEmp },
        { name: "Update Employee", value: updateEmp },
        { name: "Exit", value: endConnection},
      ],
    })
    .then(function (answer) {
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

        case "View Department":
            viewEmp();

          break;

        case "Update Employee":
            updateEmp();

          break;

        case "Exit":
            endConnection();

          break;
      }
    });
}

function addDep() {
  inquirer.prompt({}).then(function (answer) {});
}
function addRole() {
  inquirer.prompt({}).then(function (answer) {});
}
function addEmp() {
  inquirer.prompt({}).then(function (answer) {});
}
function viewEmp() {
  inquirer.prompt({}).then(function (answer) {});
}
function updateEmp() {
  inquirer.prompt({}).then(function (answer) {});
}
function endConnection(){
    connection.end();
}
