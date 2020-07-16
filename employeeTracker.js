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
				"Add employees",
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
	connection.query("SELECT name FROM employee_DB.department;", function (
		error,
		results,
		fields
	) {
		if (error) throw error;
		console.table("Departments", results);
		start();
	});
}

function viewRoles() {
	// Query the Database and render roles to the user
	connection.query(
		"SELECT title,salary,b.name as department FROM role a left join department b on a.department_id = b.id ;",
		function (error, results, fields) {
			if (error) throw error;
			console.table("Roles", results);
			start();
		}
	);
}

function viewEmployees() {
	// Query the Database and render employees to the user
	connection.query("SELECT * FROM employee_DB.employee;", function (
		error,
		results,
		fields
	) {
		if (error) throw error;
		console.table("Employees", results);
		start();
	});
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
					console.log("Successfully Added: ", [answer.departmentName], "To: ");
					viewDepartments();
				}
			);
		});
}

function addRole() {
	// Set up variables to store Department Details needed for the user's selection
	let depArray = [];
	// let depNames = [];
	// Query Database for department names
	connection.query("SELECT * FROM employee_DB.department;", function (
		error,
		results,
		fields
	) {
		// Store the results of the query as an array with the department details
		if (error) throw error;
		depArray = results.map((obj) => {
			rObj = obj;
			return rObj;
		});
		// Store the just the names of the department as an array
		// depNames = results.map((obj) => {
		// 	rObj = obj.name;
		// 	return rObj;
		// });
		// Ask user the set of questions needed for adding a role
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
						// depArray[depNames.indexOf(answer.department)].id,
						depArray.find(({ name }) => name === answer.department).id,
					],
					function (error, results, fields) {
						if (error) throw error;
						// Show the user their answers and the roles table
						console.log(
							"Successfully Added: " +
								answer.title +
								", salary " +
								answer.salary +
								" & department " +
								answer.department +
								"To: Roles"
						);
						viewRoles();
					}
				);
			});
	});
}
// // function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?",
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?",
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then(function (answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid || 0,
//           highest_bid: answer.startingBid || 0,
//         },
//         function (err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function (err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function () {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?",
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?",
//         },
//       ])
//       .then(function (answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid,
//               },
//               {
//                 id: chosenItem.id,
//               },
//             ],
//             function (error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         } else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
