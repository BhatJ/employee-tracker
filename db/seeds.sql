INSERT INTO department (name)
VALUES ("Product Development"),
    ("Therapy Development"),
    ("Legal"),
    ("Manufacturing");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1),
    ("Project Manager", 90000, 1),
    ("Engineering Manager", 225000, 1),
    ("Principle Data Analyis", 150000, 2),
    ("Research Engineer", 120000, 2),
    ("Legal Officer", 100000, 3),
    ("Manufacturing Supervisor", 150000, 4),
    ("Manufacturing Operator", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Radford", 3, NULL),
    ("Min", "Salam", 5, 1),
    ("Aly", "Fisk", 6, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;