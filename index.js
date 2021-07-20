const inquirer = require("inquirer");
const Table = require("easy-table");
const db = require("./db/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("You are connected to the server");
  startApp();
});

const startApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all roles",
          "Add employee",
        ],
      },
    ])
    .then((res) => {
      switch (res.action) {
        case "View all employees":
          viewAll();
          break;
        case "View all employees by department":
          viewAllDept();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add employee":
          addEmployee();
          break;

        default:
          viewAll();
      }
    });
};
viewAll = () => {
  const sql = `SELECT employee.*,
  roles.role_title AS role,
  roles.salary AS salary,
  department.department_name AS department
  FROM employee
  LEFT JOIN roles ON employee.role_id = roles.id
  LEFT JOIN department ON roles.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    const table = new Table();
    rows.forEach((data) => {
      table.cell("id", data.id);
      table.cell("First_Name", data.first_name);
      table.cell("Last_Name", data.last_name);
      table.cell("Role", data.role);
      table.cell("Department", data.department);
      table.cell("Salary", data.salary);
      table.cell("Manager", data.manager_id);
      table.newRow();
    });
    console.log("\n", table.toString());
    startApp();
  });
};

viewRoles = () => {
  const sql = `SELECT roles.role_title FROM roles`;
  db.query(sql, (err, rows) => {
    const table = new Table();
    rows.forEach((data) => {
      table.cell("Roles", data.role_title);
      table.newRow();
    });
    console.log(table.toString());
    startApp();
  });
};
addEmployee = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the new employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new employee's last name?",
        },
        {
          name: "roleId",
          type: "rawlist",
          choices: results.map((item) => item.role_title),
          message: "Select a role for the employee",
        },
      ])
      .then((answers) => {
        const selectedRole = results.find(
          (item) => item.role_title === answers.roleId
        );
        const sql = `INSERT INTO employee SET ?`;
        db.query(
          sql,
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: selectedRole.id,
          },
          function (err, res) {
            if (err) throw err;
            console.log(
              "Added new employee named " +
                answers.firstName +
                " " +
                answers.lastName +
                "\n"
            );
            viewAll();
            startApp();
          }
        );
      });
  });
};
viewAllDept = () => {
  const sql = `SELECT department_name FROM department `;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "departmentId",
          type: "rawlist",
          message: "Which department would you like to view?",
          choices: rows.map((item) => item.department_name),
        },
      ])
      .then((answer) => {
        const sql = `SELECT employee.*,
      roles.role_title AS role,
      roles.salary AS salary,
      department.department_name AS department
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department ON roles.department_id = department.id
      WHERE ?`;
        const selectedDept = rows.find(
          (dept) => dept.department_name === answer.departmentId
        );
        db.query(
          sql,
          [
            {
              department_name: selectedDept.department_name,
            },
          ],
          (err, res) => {
            const table = new Table();
            res.forEach((data) => {
              table.cell("id", data.id);
              table.cell("First_Name", data.first_name);
              table.cell("Last_Name", data.last_name);
              table.cell("Role", data.role);
              table.cell("Department", data.department);
              table.cell("Salary", data.salary);
              table.cell("Manager", data.manager_id);
              table.newRow();
            });
            console.log("\n", "\n", table.toString());
            startApp();
          }
        );
      });
  });
};
