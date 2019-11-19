var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();
require("console.table");

//connect to our database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.MY_SQL_PASS,
    database: "bamazon_db"
});

//test connection and start bamazon function
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptManager();
});



//query database "bamazon_db" to display all items in table "products"
var promptManager = function (results) {
    inquirer
        .prompt([
            {
                name: "menu",
                type: "list",
                message: "MENU OPTIONS: ",
                choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "QUIT"]
            }
        ])
        .then(function (managerResponse) {
            switch (managerResponse.menu) {
                case "VIEW PRODUCTS FOR SALE":
                    displayProducts();
                    break;
                default:
                    connnection.end()
            }
        });

    results = [];
     
    var displayProducts = function () {
        connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            console.table(results);
            promptManager(results);
        });
    };
};

