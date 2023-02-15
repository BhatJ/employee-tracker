
// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require('mysql2');
const consoleTable = require('console.table');

// A function that displays the applications name 'Employee Manager' to 
// the console.
const displayBanner = () => {
  outputCyanText(`  ______                 _                        `);
  outputCyanText(` |  ____|               | |                       `);
  outputCyanText(` | |__   _ __ ___  _ __ | | ___  _   _  ___  ___  `);
  outputCyanText(` |  __| | '_ ' _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ `);
  outputCyanText(` | |____| | | | | | |_) | | (_) | |_| |  __/  __/ `);
  outputCyanText(` |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| `);
  outputCyanText(` |  \\/  |         | |             __/ |           `);
  outputCyanText(` | \\  / | __ _ _ _|_| __ _  __ _ |___/_ __        `);
  outputCyanText(` | |\\/| |/ _' | '_ \\ / _' |/ _' |/ _ \\ '__|       `);
  outputCyanText(` | |  | | (_| | | | | (_| | (_| |  __/ |          `);
  outputCyanText(` |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          `);
  outputCyanText(`                            __/ |                 `);
  outputCyanText(`                           |___/                  \n\n`);
};

const viewAllDepartments = "View all departments";
const viewAllRoles = "View all roles";
const viewAllEmployees = "View all employees";
const addADepartment = "Add a department";
const addARole = "Add a role";
const addAnEmployee = "Add an employee";
const updateAnEmployeeRole = "Update an employee's role";
const exitApplication = "End session";

// A question to ask what action the user would like to perform
const whatToDoQuestion = [
  {
    type: "list",
    name: "new_action",
    choices: [viewAllDepartments, viewAllRoles, viewAllEmployees,
              addADepartment, addARole, addAnEmployee,
              updateAnEmployeeRole, exitApplication,
             ],
    message: "What would you like to do?",
  },
];

// Follow up question to ask when adding a new department
const nameOfDepartmentQuestion = [
  {
    type: "input",
    name: "department",
    message: "What is the name of the department?",
  },
];

// Follow up questions to ask when adding a new role
const newRoleQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role?",
  },
  {
    type: "list",
    name: "department",
    choices: [],
    message: "Which department does the role belong to?",
  },
];

// Follow up questions to ask when adding a new employee
const newEmployeeQuestions = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?",
  },
  {
    type: "list",
    name: "role",
    choices: [],
    message: "What is the employee's role?",
  },
  {
    type: "list",
    name: "manager",
    choices: [],
    message: "Who is the employee's manager?",
  },
];

// Follow up questions to ask when updating an employee's role
const updateEmployeeQuestions = [
  {
    type: "list",
    name: "name",
    choices: [],
    message: "Which employee's role do you want to update?",
  },
  {
    type: "list",
    name: "role",
    choices: [],
    message: "Which role do you want to assign the selected employee?",
  },
];

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // MySQL Password
    password: 'mySQL___mySQL___',
    database: 'employee_db'
  }
);

// A helper function to output text to the console in cyan
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);
const outputYellowText = (text) => console.log(`\x1b[33m${text}\x1b[0m`);

const printTable = (table) => {
  console.log("\n");
  console.table(table);
}

// A function to query the employee database and print the list of departments
const viewDepartments = () => {

  // Construct the sql query. Select all rows from the department table
  const query = `SELECT * FROM department`;

  // Execute and print the query if there is no error
  db.query(query, (err, rows) => {

    if (err) throw err; 

    printTable(rows);

    askQuestions();
  });
}

// A function to query the employee database and print the list of roles
// Print the id, title, department, and salary for each role
const viewRoles = () => {
  
  // Construct the sql query
  // 
  const query = `SELECT r.id, r.title, d.name AS department, r.salary 
                 FROM role AS r 
                 INNER JOIN department AS d ON r.department_id = d.id;`;
  
  db.query(query, (err, rows) => {
    
    if (err) throw err; 
    printTable(rows);
    
    askQuestions();
  });
}

const viewEmployees = () => {
  // Construct the sql query
  // 
  const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
                 FROM employee AS e
                 LEFT JOIN role AS r ON e.role_id = r.id
                 LEFT JOIN department AS d ON r.department_id = d.id 
                 LEFT JOIN employee AS m ON e.manager_id = m.id;`;
  
  db.query(query, (err, rows) => {
    
    if (err) throw err; 
    printTable(rows);
    
    askQuestions();
  });
}

const addDepartment = () => {
  return inquirer.prompt (nameOfDepartmentQuestion)
    .then(answers => {
      // Create sql query
      const query = `INSERT INTO department (name) VALUES ("${answers.department}");`

      db.query(query, (err, rows) => {
    
        if (err) throw err; 

        outputYellowText(`Added ${answers.department} to the database`);
        
        askQuestions();
      });
    });
}

const addRole = () => {
  // Lets get the list of departments from the employee database
  let departments = [];

  const query = `SELECT * FROM department`;

  db.query(query, (err, rows) => {

    if (err) throw err; 

    // Populate departments with the results of the query
    rows.forEach(d => {
      departments.push(d.name);
    });

    // Update the choices in the new role inquirer question array
    newRoleQuestions[2].choices = departments;

    inquirer.prompt (newRoleQuestions)
      .then (answers => { 

        const query = `INSERT INTO role (title, salary, department_id)
                       VALUES ("${answers.name}", ${answers.salary}, ${departments.indexOf(answers.department) + 1})`;

        db.query(query, (err, rows) => {

          if (err) throw err;

          outputYellowText(`Added ${answers.name} to the database`);

          askQuestions();

        });
        
      });
  });
}

const addEmployee = () => {
  // Lets get the list of roles from the employee database
  let roles = [];
  let managers = ["None"];

  const query = `SELECT * FROM role`;

  db.query(query, (err, rows) => {

    if (err) throw err; 

    // Populate roles with the results of the query
    rows.forEach(r => {
      roles.push(r.title);
    });

    // Update the choices in the new employee inquirer question array
    newEmployeeQuestions[2].choices = roles;

    const query = `SELECT CONCAT(e.first_name, " ", e.last_name) AS name FROM employee AS e`;

    db.query(query, (err, rows) => {
      rows.forEach(e => {
        managers.push(e.name);
      })

      newEmployeeQuestions[3].choices = managers;

      // Ask the user questions about the new employee
      inquirer.prompt (newEmployeeQuestions)
        .then (answers => { 

          let query;

          if (answers.manager === "None")
          {
            query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                     VALUES ("${answers.first_name}", "${answers.last_name}", ${roles.indexOf(answers.role) + 1}, NULL)`;
          } else 
          {
            query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                     VALUES ("${answers.first_name}", "${answers.last_name}", ${roles.indexOf(answers.role) + 1}, ${managers.indexOf(answers.manager)})`;
          }

          db.query(query, (err, rows) => {

            if (err) throw err;

            outputYellowText(`Added ${answers.first_name} ${answers.last_name} to the database`);

            askQuestions();

          });
      });
    });
  });
}

const updateEmployee = () => {
  // Lets get the list of roles from the employee database
  let roles = [];
  let employees = [];

  const query = `SELECT * FROM role`;

  db.query(query, (err, rows) => {

    if (err) throw err; 

    // Populate roles with the results of the query
    rows.forEach(r => {
      roles.push(r.title);
    });

    // Update the choices in the new employee inquirer question array
    updateEmployeeQuestions[1].choices = roles;

    const query = `SELECT CONCAT(e.first_name, " ", e.last_name) AS name FROM employee AS e`;

    db.query(query, (err, rows) => {
      rows.forEach(e => {
        employees.push(e.name);
      })

      updateEmployeeQuestions[0].choices = employees;

      // Ask the user questions about the new employee
      inquirer.prompt (updateEmployeeQuestions)
        .then (answers => { 

          const query = `UPDATE employee
                         SET role_id = ${roles.indexOf(answers.role) + 1}
                         WHERE id = ${employees.indexOf(answers.name) + 1}`;

          db.query(query, (err, rows) => {

            if (err) throw err;

            outputYellowText(`Added ${answers.name} role`);

            askQuestions();

          });
      });
    });
  });
}

const askQuestions = () => {

  return inquirer.prompt (whatToDoQuestion)
    .then(answers => {

      switch (answers.new_action) {
        case viewAllDepartments:
          viewDepartments();
          break;
        case viewAllRoles:
          viewRoles();
          break;
        case viewAllEmployees:
          viewEmployees();
          break;
        case addADepartment:
          addDepartment();
          break;
        case addARole:
          addRole();
          break;
        case addAnEmployee:
          addEmployee();
          break;
        case updateAnEmployeeRole:
          updateEmployee();
          break;
        case exitApplication:
          process.exit();
      };
    })
}

displayBanner();

askQuestions();
