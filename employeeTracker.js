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
	// run the start function after the connection is made to prompt the user
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
			// based on their answer, allow the user to view,add or update database information
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
	// mysql how to make a sql call
	// const cTable = require("console.table");
	connection.query("SELECT * FROM employee_DB.department;", function (
		error,
		results,
		fields
	) {
		if (error) throw error;
		console.log("Table Results: ", results);
		start();
	});
}

function viewRoles() {
	// mysql how to make a sql call
	// const cTable = require("console.table");
	connection.query("SELECT * FROM employee_DB.role;", function (
		error,
		results,
		fields
	) {
		if (error) throw error;
		console.log("Table Results: ", results);
		start();
	});
}

function viewEmployees() {
	connection.query("SELECT * FROM employee_DB.employee;", function (
		error,
		results,
		fields
	) {
		if (error) throw error;
		console.log("Table Results: ", results);
		start();
	});
}

function addDepartment() {
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
					console.log("Added: ", [answer.departmentName]);
					console.log("To: ", viewDepartments());
					start();
				}
			);
		});
}

function addRole() {
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
			// Placeholder - See how to lookup the department IDs by prompting the user with Department Names
		])
		.then(function (answer) {
			connection.query(
				"INSERT INTO `employee_DB`.`role`(`title`,`salary`,`department_id`)VALUES(?,?,?);",
				[
					answer.title,
					Math.floor(parseInt(answer.salary)),
					// Placeholder - Department ID 1
					1,
				],
				function (error, results, fields) {
					if (error) throw error;
					console.log([
						"Added: ",
						answer.title + ", salary " + answer.salary + " & department",
					]);
					console.log("To: ", viewRoles());
					start();
				}
			);
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
