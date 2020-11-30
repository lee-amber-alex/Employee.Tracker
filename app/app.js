require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
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
          console.log("Department created.");

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
            return true
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
          console.log("Role created.");

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
            return true
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
            return true
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
          console.log("Employee added.");

          start();
        }
      );
    });
}
function viewDep() {
  connection.query("SELECT * FROM department", function (err, department) {
    if (err) throw err;
    console.table(department);
    start();
  });
}
function viewEmp() {
  connection.query("SELECT * FROM employees", function (err, employees) {
    if (err) throw err;
    console.table(employees);
    start();
  });
}
function viewRole() {
  connection.query("SELECT * FROM roles", function (err, roles) {
    if (err) throw err;
    console.table(roles);
    start();
  });
}
function updateEmp() {
  connection.query("SELECT * FROM employees", function (err, employees) {
    if (err) throw err;
    connection.query("SELECT * FROM roles", function (err, roles) {
      if (err) throw err;
const employeeChoices = employees.map(emp => ({ name: emp.full_name, value: emp})); 
const rolesChoices = roles.map(role => ({ name: role.roles, value: role})) 
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
            choices:rolesChoices,
          },
        ])
        .then(function (answer) {
          connection.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [answer.updateRole.id, answer.updateEmp.id],
            function (err) {
              if (err) throw err;
              console.log("Employee updated.");
              start();
            }

          );
          
        });
    });
  });
}
