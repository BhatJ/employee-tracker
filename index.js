
// Include packages needed for this application
const inquirer = require("inquirer");

// A helper function to output text to the console in cyan
const outputCyanText = (text) => console.log(`\x1b[36m${text}\x1b[0m`);

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

// A question to ask what action the user would like to perform
const whatToDoQuestion = [
  {
    type: "list",
    name: "new_action",
    choices: [viewAllDepartments, viewAllRoles, viewAllEmployees,
              addADepartment, addARole, addAnEmployee,
              updateAnEmployeeRole
             ],
    message: "What would you like to do?",
  },
];

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
  console.log("\nAdd a department\n");
}

const addRole = () => {
  console.log("\nAdd a role\n");
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
      };

      askQuestions();

    });
};

displayBanner();

askQuestions();

