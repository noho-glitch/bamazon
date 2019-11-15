DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL (9, 2),
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Hitchhiker's Guide to the Galaxy", "Books", 14.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("John Dies at the End", "Books", 17.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("American Desperado", "Books", 15.00, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Nintendo Switch", "Video Game Consoles", 299.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Nintendo Switch Lite", "Video Game Consoles", 199.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Death Stranding", "Video Games", 59.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Cyberpunk 2077", "Video Games", 59.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("The Go-Go's - Beaty and the Beat", "Vinyl", 18.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Sunglasses", "Apparel: Accessories", 17.00, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Socks 3-Pack", "Apparel", 7.00, 59);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Towel", "Necessities", 11.00, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Tooth Brush", "Necessities", 3.00, 62);