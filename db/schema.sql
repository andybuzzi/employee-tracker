DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (6,0),
  department_id INTEGER NOT NULL REFERENCES department(id),
  CONSTRAINT fk_department FOREIGN KEY (department_id)  
  REFERENCES department(id)  
  ON DELETE CASCADE  
  ON UPDATE CASCADE  
);

