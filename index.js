
// Include packages needed for this application
const inquirer = require("inquirer");

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
const updateAnEmployeeRole = "Update and employee role";
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
    type: "input",
    name: "department",
    message: "Which department does the role belong to?",
  },
];


// A helper function to output text to the console in cyan
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);

const viewDepartments = () => {
  console.log("\nView all departments\n");
}

const viewRoles = () => {
  console.log("\nView all roles\n");
}

const viewEmployees = () => {
  console.log("\nView all employees\n");
}

const addDepartment = () => {
  return inquirer.prompt (nameOfDepartmentQuestion)
    .then(answers => {
      console.log("\nAdd " + answers.department + " to the table of departments\n");

      askQuestions();
    })
}

const addRole = () => {
  return inquirer.prompt (newRoleQuestions)
    .then(answers => {
      console.log("\nAdd " + answers.name + " to the table of roles\n");

      askQuestions();
    })
}

const addEmployee = () => {
  console.log("\nAdd an employee\n");
}

const updateEmployee = () => {
  console.log("\nUpdate an employee role\n");
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
          return;
      };
    })
}

displayBanner();

askQuestions();

