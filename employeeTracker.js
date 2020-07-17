//#region Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
//#endregion Packages

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	// Your port; if not 3306
	port: 3306,
	// Your username
	user: "root",
	// Your password
	password: "password",
	// Default Database
	database: "employee_DB",
	multipleStatements: true,
});

// connect to the mysql server and sql database
connection.connect(function (err) {
	if (err) throw err;
	// start user prompt
	start();
});

// // function which prompts the user for what action they should take
function start() {
	inquirer
		.prompt({
			name: "menu",
			type: "list",
			message: "What action would you like to take",
			choices: [
				"View Departments",
				"View roles",
				"View employees",
				"Add Department",
				"Add role",
				"Add employee",
				"Update employee roles",
				"Exit",
			],
		})
		.then(function (answer) {
			// based on the users answer, allow the user to view, add or update database information
			switch (answer.menu) {
				case "View Departments":
					viewDepartments();
					break;
				case "View roles":
					viewRoles();
					break;
				case "View employees":
					viewEmployees();
					break;
				case "Add Department":
					addDepartment();
					break;
				case "Add role":
					addRole();
					break;
				case "Add employee":
					addEmployees();
					break;
				case "Update employee roles":
					updateEmpRole();
				case "Exit":
					connection.end();
					break;
				default:
					break;
			}
		});
}

function viewDepartments() {
	// Query the Database and render departments to the user
	connection.query(
		"SELECT name as Departments FROM employee_DB.department;",
		function (error, results, fields) {
			if (error) throw error;
			console.table(results);
			start();
		}
	);
}

function viewRoles() {
	// Query the Database and render roles to the user
	connection.query(
		"SELECT title as Role,salary as Salary,b.name as Department FROM role a left join department b on a.department_id = b.id ;",
		function (error, results, fields) {
			if (error) throw error;
			console.table(results);
			start();
		}
	);
}

function viewEmployees() {
	// Query the Database and render employees to the user
	connection.query(
		"SELECT concat(a.first_name,' ',a.last_name) as 'Employee Name', b.title as Title, IFNULL(concat(c.first_name,' ',c.last_name),'') as 'Manager Name' FROM employee a left join role b on a.role_id = b.id left join employee c  on a.manager_id = c.id;",
		function (error, results, fields) {
			if (error) throw error;
			console.table(results);
			start();
		}
	);
}

function addDepartment() {
	// ask the user for the details required to add a department
	inquirer
		.prompt({
			name: "departmentName",
			type: "input",
			message: "What is the Department name you would like to add?",
		})
		.then(function (answer) {
			connection.query(
				"INSERT INTO `employee_DB`.`department`(`name`)VALUES(?);",
				[answer.departmentName],
				function (error, results, fields) {
					if (error) throw error;
					// Show the user their answers and the Department table
					console.log(
						"Successfully Added: " + [answer.departmentName] + " To: "
					);
					viewDepartments();
				}
			);
		});
}

function addRole() {
	// Set up variables to store Department Details needed for the user's selection

	// Query Database for department names
	connection.query("SELECT * FROM employee_DB.department;", function (
		error,
		results,
		fields
	) {
		// Store the results of the query as an array with the department details
		if (error) throw error;
		// Reshape the results of the department query to be an array with department details
		let depArray = results.map((obj) => {
			return { name: obj.name, value: obj };
		});
		// ask the user the required inputs for adding a role
		inquirer
			.prompt([
				{
					name: "title",
					type: "input",
					message: "What is the role's Title ?",
				},
				{
					name: "salary",
					type: "input",
					message: "What is the role's salary ?",
				},
				{
					name: "department",
					type: "list",
					message: "Which department does this role belong to ?",
					choices: depArray,
				},
			])
			.then(function (answer) {
				connection.query(
					"INSERT INTO `employee_DB`.`role`(`title`,`salary`,`department_id`)VALUES(?,?,?);",
					[
						answer.title,
						// Insure the salary response is stored as an integer and drop the decimals
						Math.floor(parseInt(answer.salary)),
						answer.department.id,
					],
					function (error, results, fields) {
						if (error) throw error;
						// Show the user their answers and the roles table
						console.log(
							"Successfully Added: " +
								answer.title +
								" with a salary of " +
								answer.salary +
								" within the " +
								answer.department.name +
								" Department To: "
						);
						viewRoles();
					}
				);
			});
	});
}

function addEmployees() {
	connection.query(
		'SELECT id,title FROM employee_DB.role; SELECT id, concat(first_name," ",last_name) as manager FROM  employee_DB.employee;',
		function (error, results, fields) {
			// Store the results of the query as an array with the department details
			if (error) throw error;
			// Reshape the results of the department query to be an array with department details
			let rolesArray = results[0].map((obj) => {
				return { name: obj.title, value: obj };
			});
			let managersArray = results[1].map((obj) => {
				return { name: obj.manager, value: obj };
			});
			// ask the user the required inputs for adding a role
			inquirer
				.prompt([
					{
						name: "firstname",
						type: "input",
						message: "Employee's First Name ?",
					},
					{
						name: "lastname",
						type: "input",
						message: "Employee's Last Name ?",
					},
					{
						name: "manager",
						type: "list",
						message: "What is the Employee's Manager?",
						choices: managersArray,
					},
					{
						name: "role",
						type: "list",
						message: "What is the Employee's Role ?",
						choices: rolesArray,
					},
				])
				.then(function (answer) {
					connection.query(
						"INSERT INTO `employee_DB`.`employee`(`first_name`,`last_name`,`manager_id`,`role_id`)VALUES(?,?,?,?);",
						[
							answer.firstname,
							answer.lastname,
							answer.manager.id,
							answer.role.id,
						],
						function (error, results, fields) {
							if (error) throw error;
							// Show the user their answers and the roles table
							console.log(
								"Successfully Added: " +
									answer.firstname +
									" " +
									answer.lastname +
									" reporting to  " +
									answer.manager +
									" as a " +
									answer.role +
									" To: "
							);
							viewEmployees();
						}
					);
				});
		}
	);
}

function updateEmpRole() {
	connection.query(
		'SELECT id,concat(first_name," ",last_name) as employeeName FROM employee_DB.employee; SELECT id,title FROM employee_DB.role;',
		function (error, results, fields) {
			// Store the results of the query as an array with the department details
			if (error) throw error;
			// Reshape the results of the department query to be an array with department details
			let empArray = results[0].map((obj) => {
				return { name: obj.employeeName, value: obj };
			});
			let rolesArray = results[1].map((obj) => {
				return { name: obj.title, value: obj };
			});
			// ask the user the required inputs for adding a role
			inquirer
				.prompt([
					{
						name: "selectedEmployee",
						type: "list",
						message: "Which Employee's role would you like to update ?",
						choices: empArray,
					},
					{
						name: "selectedRole",
						type: "list",
						message: "What is their new role ?",
						choices: rolesArray,
					},
				])
				.then(function (answer) {
					connection.query(
						"UPDATE `employee_DB`.`employee`SET `role_id` = ? WHERE `id` = ?;",
						[answer.selectedRole.id, answer.selectedEmployee.id],
						function (error, results, fields) {
							if (error) throw error;
							// Show the user their answers and the roles table
							console.log(
								"Successfully Updated: " +
									answer.selectedEmployee.name +
									" role to " +
									answer.selectedRole.name
							);
							viewEmployees();
						}
					);
				});
		}
	);
}
