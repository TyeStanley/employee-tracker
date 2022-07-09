// dependencies
import inquirer from 'inquirer';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import figlet from 'figlet';
import cTable from 'console.table';
dotenv.config();

figlet("Employee \n \n Tracker", (err, data) => {
  if (err) throw err;
  console.log(data);
});

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

db.connect(err => {
  if (err) throw err;
  start();
})

function start() {
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
    }).then(answer => {
    switch (answer.menu) {
      case "View All Employees":
        viewAllEmployees();
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

// Functions 

function viewAllEmployees() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function addEmployee() {
  db.query('SELECT * FROM employee, role', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name?",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Please enter the first name.");
          }
        }
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name?",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Please enter the last name.");
          }
        }
      },
      {
        name: "role",
        type: "rawlist",
        choices: () => {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
            }
            // remove duplicates
            let cleanChoiceArray = [...new Set(choiceArray)];
            return cleanChoiceArray;
        },
        message: "What is the role?",
      }
    ]).then(answer => {
      let chosenRole;

      for (let i = 0; i < results.length; i++) {
        if (results[i].title === answer.role) {
            chosenRole = results[i];
        }
      }

      db.query(`INSERT INTO employee SET ?`, 
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: chosenRole.id
      },
      (err) => {
        if (err) throw err;
        console.log(`${answer.firstName} ${answer.lastName} was added as a ${answer.role}.`);
        start();
      });
    })
  })
}

function updateEmployeeRole() {
  db.query('SELECT * FROM employee, role', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
          name: "employee",
          type: "rawlist",
          choices: () => {
              let choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].last_name);
              }
              // remove duplicates
              let cleanChoiceArray = [...new Set(choiceArray)];
              return cleanChoiceArray;
          },
          message: "Which employee would you like to update?"
      },
      {
        name: "role",
        type: "rawlist",
        choices: () => {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
            }
            //remove duplicates
            let cleanChoiceArray = [...new Set(choiceArray)];
            return cleanChoiceArray;
        },
        message: "What is the employee's new role?"
      }
    ]).then(answer => {
      let chosenEmployee;
      let chosenRole;

      for (let i = 0; i < results.length; i++) {
        if (results[i].last_name === answer.employee) {
            chosenEmployee = results[i];
        }
      }

      for (let i = 0; i < results.length; i++) {
        if (results[i].title === answer.role) {
            chosenRole = results[i];
        }
      }

      db.query(`UPDATE employee SET ? WHERE ?`,
        [
          {
            role_id: chosenRole
          },
          {
            last_name: chosenEmployee
          }
        ],
        (err) => {
          if (err) throw err;
          console.log(`${answer.employee}'s role was updated to ${answer.role}.`);
          start();
        }
      );
    })
  })
}

function viewAllRole() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}
