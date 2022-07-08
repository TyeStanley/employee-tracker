import inquirer from 'inquirer';
import db from './db/connection.js';
import sqlClass from './db/sqlClass.js';
import cTable from 'console.table';
const sql = new sqlClass();

const questions = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
      "Add Employee",
      "Update Employee Role",
      "View All Role",
      "View All Departments",
      "Add Department",
      "Quit"
    ]
  }
]
// Test Zone
function init() {
  inquirer.prompt(questions).then(answers => {
    switch (answers.menu) {
      case 'Add Employee':
        sql.addEmployee();
        break;
      case 'Update Employee Role':
        sql.updateEmployeeRole();
        break;
      case 'View All Role':
        sql.viewAllRole();
        break;
      case 'View All Departments':
        sql.viewAllDepartments();
        break;
      case 'Add Department':
        sql.addDepartment();
        break;
      case 'Quit':
        sql.quit();
        break;
    }
  });
};

function hello() {
  console.log('Hello World');
}
// hello();
init();