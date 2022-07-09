import inquirer from 'inquirer';
import db from './db/connection.js';
import cTable from 'console.table';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);













db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
  start();
});

function init() {
  console.log('==========================================================');
    inquirer.prompt(
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Role",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit"
        ]
      }).then(answers => {
      switch (answers.menu) {
        case "View All Employees":
          main();
          
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Role':
          viewAllRole();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          quit();
          break;
      }
    });
}

// View All Employees
function viewAllEmployeet() {

  return new Promise(resolve => {
    db.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
      console.table(results);
      
    });
  })
  
}
async function main() {
  const result = await viewAllEmployeet();
  console.table(result);
  init();

}

// add employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is your first name?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is your last name?'
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Who is your managers id?'
    }
  ]).then(answers => {

    db.query(`INSERT INTO employee (first_name, last_name, manager_id) VALUES
      ('${answers.firstName}', '${answers.lastName}', '${answers.manager_id}')`, (err, res) => {
      if (err) throw err;
      console.log(`${answers.firstName} ${answers.lastName} was added to the database`);
    });
    init();

  })
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee',
      message: 'What is the name of the employee?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the role?'
    }
  ])
  .then(answers => {
    db.query(`UPDATE employee SET role_id = '${answers.role}' WHERE first_name = '${answers.employee}'`, (err, res) => {
      console.table(`${answers.employee}'s role was updated to ${answers.role}`);
    });
    init();
  })
}

function viewAllRole() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table('View All Roles', results);
  });
  init();
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?'
    }
  ])
  .then(answers => {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES 
      ('${answers.role}', '${answers.salary}', '${answers.department}')`, (err, res) => {
      if (err) throw err;
      console.table(`${answers.role} was added to the database`);
    });
    init();
  })
}

// View All Departments
function viewAllDepartments() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table('View All Departments', results);
  });
  init();
}

// Add Department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?'
    }
  ])
  .then(answers => {
    db.query(`INSERT INTO department (name) VALUES ('${answers.department}')`, (err, res) => {
      if (err) throw err;
      console.table(`${answers.department} was added to the database`);
    });
    init();
  })
}

// Quit
function quit() {
  console.log('==========================================================');
  console.log('Goodbye!');
  console.log('==========================================================');
  process.exit();
}

// Run the init function
init();