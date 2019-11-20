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
                case "VIEW LOW INVENTORY":
                    displayLowInventory();
                    break;
                case "ADD TO INVENTORY":
                    addInventory();
                    break;
                case "QUIT":
                    connection.end();
                    break;
                default:
                    connection.end()

            }
        });

    results = [];
    //function to display full inventory with console.table
    var displayProducts = function () {
        connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            console.table(results);
            promptManager(results);
        });
    };
    //function to display low inventory with console.table
    var displayLowInventory = function () {
        connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, results) {
            console.table(results);
        })
    }
    //function to first display inventory and then query manager to select product to add stock too
    var addInventory = function () {
        connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            console.table(results);
            chooseProduct();
        });
    };
    var chooseProduct = function () {
        inquirer
            .prompt([
                {
                name: "choice",
                type: "number",
                message:
                    "What number item would you like to add stock to?"
                },
                {
                name: "quantity",
                type: "number",
                message: "How many many units would you like to add?"
                }
            ]).then(function(answer) {
            
                console.log(answer.choice)
                console.log(answer.quantity)
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: chosenItem.stock_quantity += answer.quantity
                      },
                      {
                        item_id: chosenItem.item_id
                      }
                    ],
                    function(err, results) {
                      if (err) throw err;
      
                      setTimeout(displayProducts, 3000); 
                    }
                  );
                
                })


                // connection.query("UPDATE products SET ? WHERE ?",
                //     [
                //       {
                //         item_id: answer.choice
                //       },
                //       {
                //         stock_quantity: answer.quantity
                //       }
                //     ],
                //     function(err, results) {
                //       if (err) throw err;
      
                //       setTimeout(displayProducts, 3000); 
                //     }
                //   );

                // for (var i = 0; i < results.length; i++) {
                //     if (results[i].item_id === answer.choice) {
                //       chosenItem = results[i].product_name;

                //       console.log("You chose: " + chosenItem + "|| Current Stock: " + results[i].stock_quantity);
                //     }
                //   }
            })
    };


};


