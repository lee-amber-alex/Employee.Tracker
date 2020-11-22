DROP DATABASE IF EXISTS cms_DB;

CREATE DATABASE cms_DB;

USE cms_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL,
  primary key(id),
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  roles VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
--   dep_id INT not null
  primary key(id),
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(30) NOT NULL,
--   role_id INT NOT NULL,
--   manager_id INT NOT NULL,
  primary key(id),
);