DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Simple - Yotam Ottolengi", "Ottlengi Cuisine", 40.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jerusalem - Yotam Ottolengi", "Ottlengi Cuisine", 35.50, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plenty - Yotam Ottolengi", "Ottlengi Cusine", 28.99, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plenty More - Yotam Ottolengi", "Ottlengi Cuisine", 29.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Meyer's Baker - Clause Meyer", "Nordic Cuisine", 50.00, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Nordic Kitchen - Clause Meyer", "Nordic Cuisine", 45.50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tacos Recipes and Provocations - Alex Stupak", "Mexican Cuisine", 35.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nopalito: A Mexican Kitchen - Gonzalo Guzman", "Mexican Cuisine", 38.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Home Cooking - Morimoto", "Japanese Cuisine", 40.50, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Japanese Farm Food - Kenji Miura", "Japanese Cuisine", 45.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Just Bento Cookbook: Everyday Lunches To Go -Makiko Itoh", "Japanese Cuisine", 38.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Seven Fires: Gilling the Argentine Way - Francis Mallmann", "South American Cuisine", 28.50, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Fire Peru: Recipes and Stories From My Purvian Kitchen - Ricado Zarate", "South American Cuisine", 34.99, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gran Cocina Latina: The Food of Latin America - Maricel E. Presilla", "South American Cuisine", 30.00, 6);
