const inquirer = require("inquirer");
const mysql = require("mysql");

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
        "Update Employee",
        "Exit",
      ],
    })
    .then((answer)=>{
       
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
    console.log("it works!");
//   inquirer.prompt({}).then(function (answer) {});
}
function addRole() {
    console.log("it works!");
//   inquirer.prompt({}).then(function (answer) {});
}
function addEmp() {
    console.log("it works!");
//   inquirer.prompt({}).then(function (answer) {});
}
function viewDep() {
    console.log("it works!");
//   inquirer.prompt({}).then(function (answer) {});
}
function viewEmp() {
    console.log("it works!");
//   inquirer.prompt({}).then(function (answer) {});
}
function updateEmp() {
    console.log("it works!");
//   inquirer.prompt({}).then(function (answer) {});
}
function endConnection(){
    console.log("it works!");
    connection.end();
}
start();