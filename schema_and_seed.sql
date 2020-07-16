DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (30,2) NOT NULL,
  department_id INT NOT NULL,
     FOREIGN KEY (department_id)
     REFERENCES department(id)
     ON DELETE CASCADE
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  manager_id INT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE CASCADE,
  role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE );
    
-- Set the DB
USE employee_DB;
-- Populate Departments
INSERT INTO department (id,name)
    VALUES
        (1,'Sales'),
        (2,'Finance'),
        (3,'Legal'),
        (4,'Engineering');

-- Populate Roles 
INSERT INTO role (id,title,salary,department_id)
    VALUES
        (01,'Sales Lead',70000.01,1),
        (02,'Salesperson',50000.02,1),
        (03,'Lead Engineer',200000.03,4),
        (04,'Software Engineer',150000.04,4),
        (05,'Accountant',90000.00,2),
        (06,'Legal Team Lead',180000.05,3),
        (07,'Lawyer',160000.06,3);

-- Populate Employees

INSERT INTO employee (id,first_name,last_name,manager_id,role_id)
    VALUES
        (001,'Dre','Lajara',NULL,03),
        (002,'Jordan','Neill',001,04),
        (003,'Kevin','Holder',001,04),
        (004,'Ashley','Lerma',001,04),
        (005,'Jos','Lajara',NULL,05),
        (006,'James','Fletcher',NULL,06),
        (007,'Francia','Fletcher',006,07),
        (008,'Victor','Roldan',NULL,01);