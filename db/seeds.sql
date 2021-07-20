INSERT INTO department (department_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (role_title, salary, department_id)
VALUES
  ('Sales Lead', '100000', 1),
  ('Salesperson', '80000', 1),
  ('Lead Engineer', '150000', 2),
  ('Software Engineer', '120000', 2),
  ('Accountant', '125000', 3),
  ('Legal Team Lead', '250000', 4),
  ('Lawyer', '190000', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Mike', 'Chan', 2, Null),
  ('Ashley', 'Rodriguez', 3, Null),
  ('Kevin', 'Tupik', 4, Null),
  ('Malia', 'Brown', 5, Null),
  ('Sarah', 'Lourd', 6, Null),
  ('Tom', 'Allen', 7, Null),
  ('Tammer', 'Galal', 4, Null);
 



