require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
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
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Employee",
        "View Roles",
        "Update Employee",
        "Delete Info",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.addInfo) {
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

        case "View Roles":
          viewRole();

          break;
        case "View Department":
          viewDep();

          break;

        case "Update Employee":
          updateEmp();

          break;

        case "Delete Info":
          deleteInfo();

          break;

        case "Exit":
          connection.end();

          break;
      }
    });
}

function addDep() {
  inquirer
    .prompt([
      {
        name: "addDep",
        type: "input",
        message: "What Department would you like to add?",
      },
      {
        name: "depManager",
        type: "input",
        message: "Who manages this department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dep_name: answer.addDep,
          dep_manager: answer.depManager,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen.bold("Department created."));

          start();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What Position would you like to add?",
      },
      {
        name: "depId",
        type: "input",
        message: "What is the Department ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID must only contain numbers.";
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          roles: answer.addRole,
          dep_id: answer.depId,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen.bold("Role created."));

          start();
        }
      );
    });
}
function addEmp() {
  inquirer
    .prompt([
      {
        name: "addEmp",
        type: "input",
        message: "What Employee would you like to add?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the role ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID must only contain numbers.";
          } else {
            return true;
          }
        },
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the manager ID?",
        validate: function (answer) {
          if (isNaN(answer)) {
            return "ID must only contain numbers.";
          } else {
            return true;
          }
        },
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          full_name: answer.addEmp,
          role_id: answer.roleId,
          manager_id: answer.managerID,
        },
        function (err) {
          if (err) throw err;
          console.log(chalk.black.bgGreen.bold("Employee added."));

          start();
        }
      );
    });
}
function viewDep() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}
function viewEmp() {
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}
function viewRole() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}
function updateEmp() {
  connection.query("SELECT * FROM employees", function (err, employees) {
    if (err) throw err;
    connection.query("SELECT * FROM roles", function (err, roles) {
      if (err) throw err;
      const employeeChoices = employees.map((emp) => ({
        name: emp.full_name,
        value: emp,
      }));
      const rolesChoices = roles.map((role) => ({
        name: role.roles,
        value: role,
      }));
      inquirer
        .prompt([
          {
            name: "updateEmp",
            type: "list",
            message: "Which Employee id would you like to update?",
            choices: employeeChoices,
          },
          {
            name: "updateRole",
            type: "list",
            message: "What is the new role?",
            choices: rolesChoices,
          },
        ])
        .then(function (answer) {
          connection.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [answer.updateRole.id, answer.updateEmp.id],
            function (err) {
              if (err) throw err;
              console.log(chalk.black.bgGreen.bold("Employee updated."));
              start();
            }
          );
        });
    });
  });
}
function deleteInfo() {
  inquirer
    .prompt([
      {
        name: "deleteTable",
        type: "list",
        message: "What information would you like to delete?",
        choices: ["employees", "roles", "department"],
      },
    ])
    .then(function (answer) {
      connection.query(
        "SELECT * FROM ?",
        [answer.deleteTable],
        function (err, results) {
          if (err) throw err;
          const deleteChoices = results.map((record) => ({
            name: record.full_name || record.dep_name || record.roles,
            value: record.id,
          }));
          inquirer
            .prompt([
              {
                name: "deleteRecord",
                type: "list",
                message: "Which record would you like to delete?",
                choices: deleteChoices,
              },
            ])
            .then(({ deleteRecord }) => {
              connection.query("DELETE FROM ? WHERE id = ?", [answer.deleteTable, deleteRecord], function(err, deleteResults){
                if(err) throw err;
                
                console.log("Information deleted.")
                start();
              })
            });
        }
      );
    });
}
