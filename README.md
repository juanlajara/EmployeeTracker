<h1 align='center'>EmployeeTracker</h1>
  <div align='center'>
    <img height="32" width="32" style="vertical-align:center;margin:4px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/npm.svg" /img><img  height="32" width="32" padding-left="25px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/visualstudiocode.svg" style="vertical-align:center; margin:5px" </img> </div>

## 💡 Project Overview

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this assignment, we will architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

## ✨ User Story

We can frame this challenge as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## ⚓ Minimum Requirements

- The command-line application should allow users to:

  - Add departments, roles, employees

  - View departments, roles, employees

  - Update employee roles

## 🧑🏻‍💻 Database Schema

- **department**:

  - **id** - INT PRIMARY KEY
  - **name** - VARCHAR(30) to hold department name

- **role**:

  - **id** - INT PRIMARY KEY
  - **title** - VARCHAR(30) to hold role title
  - **salary** - DECIMAL to hold role salary
  - **department_id** - INT to hold reference to department role belongs to

- **employee**:

  - **id** - INT PRIMARY KEY
  - **first_name** - VARCHAR(30) to hold employee first name
  - **last_name** - VARCHAR(30) to hold employee last name
  - **role_id** - INT to hold reference to role employee has
  - **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

- **Schema Visual Representation**:

    <details>
    <summary>🌟 Schema Diagram (click to view/collapse)</summary>
    1 of 1
    <img src="./Assets/schema.png">
    </details>

## 📦 Setup and Instructions

- Ensure `Node.js` is installed on your machine. If `Node.js` is not installed on your machine, [click here](https://nodejs.org/en/) to download and install the application.
- The `package.json` file included in this repo already lists all Node modules, NPM packages, and other dependencies that are required to successfully run this application. Please be sure to run the `npm install` command within the _terminal, while in_ the root directory to install all required modules/packages.
- Use the `schema.sql` to create the database in [MySQL](https://www.mysqltutorial.org/).For assistance on how to install, creat and connect to [MySQL](https://www.mysqltutorial.org/getting-started-with-mysql/) - simply click this link.
- (Optional) then run the `seed.sql` file to pre-populate your database. This will make the development and testing of individual features much easier. Check out [SQL Bolt](https://sqlbolt.com/) for some extra MySQL help.

- Next run `node employeeTracker.js` to start the application.

  ### Tools & Packages

  > #### NPM Packages
  >
  > - Used the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.
  >
  > - Used [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.
  >
  > - Used [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

## 📽️ The following animation demonstrates the application's functionality:

![Employee Tracker](Assets/employee-tracker.gif)

## 📓 Contributor(s)

<table>
  <tr>
    <td align="center"><a href="https://juanlajara.github.io/portfolio.html"><img src="https://avatars0.githubusercontent.com/u/54958540" width="100px;" alt=""/><br /><sub><b>Andres Lajara</b></sub></a><br />
   <a href="https://github.com/juanlajara"><img src="./Assets/github.svg" width="20px;" alt=""></a>
   <a href="https://www.linkedin.com/in/juan-andres-lajara-179a8442"><img src="./Assets/linkedin.svg" width="20px;" alt=""></a>
    <details>
      <summary style="font-size:12px">Click to View More</summary>

[![Github Stats By Anurag](https://github-readme-stats.vercel.app/api?username=juanlajara&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515)](https://github.com/anuraghazra/github-readme-stats)

  </details>

  </td> 
  </tr>
</table>

## <img src="Assets/peerCoders.gif" width="30px"> Peer coders

| Team Member  | GitHub Link                              | LinkedIn Link                                               |
| ------------ | ---------------------------------------- | ----------------------------------------------------------- |
| Kevin Holder | [View](https://github.com/kholder777)    | [View](https://www.linkedin.com/in/kevin-holder-25476788/)  |
| Jordan Neill | [View](https://github.com/jordanalexis6) | [View](https://www.linkedin.com/in/jordan-neill-a48b681a0/) |
| Ashley Lerma | [View](https://github.com/AshleyLerma)   | [View](https://www.linkedin.com/in/ashleylerma/)            |

## 🔥 Desired Future Enhancements

- The command-line application should allow users to:

  - Update employee managers

  - View employees by manager

  - Delete departments, roles, and employees

  - View the total utilized budget of a department -- ie the combined salaries of all employees in that department
