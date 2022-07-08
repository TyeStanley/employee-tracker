import inquirer from 'inquirer';
import db from './connection.js';

class sql {
  // add an employee to the database
  addEmployee() {
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
    ])
    .then(answers => {
      db.query(`INSERT INTO employee (first_name, last_name, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.manager}')`, (err, res) => {
        if (err) throw err;
        console.table(`${answers.firstName} ${answers.lastName} was added to the database`);
      });
      init();
    })
  }
  // update an employee's role
  updateEmployeeRole() {
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
  // view all roles
  viewAllRole() {
    db.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
    init();
  }
  // add a department to the database
  addDepartment() {
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
  
  // add a role to the database
  addRole() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'input',
        name: 'department',
        message: 'What is the department of the role?'
      }
    ])
    .then(answers => {
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department}')`, (err, res) => {
        if (err) throw err;
        console.table(`${answers.title} was added to the database`);
      });
      init();
    })
  }
  
}

export default sql;