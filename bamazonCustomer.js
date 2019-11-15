var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();

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
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});


results = [];


//query database "bamazon_db" to display all items in table "products"
var promptUser = function() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for(var i = 0; i < results.length; i++) {
      console.log("\n" +
        results[i].item_id + " | " + results[i].product_name + " | "  + results[i].department_name + " | " + "$" + results[i].price + " | " + results[i].stock_quantity);
      }
  })


  inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
            }
            return choiceArray;
          },
          message: "What item number would you like to purchase? ('q' to quit)"       
        },
        {
          name: "quantity",
          type: "number",
          message: "How many would you like to buy?"
        }
      ]).then(function(checkInventory) {

        var itemChoice;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            itemChoice = results[i];
          }
          if (answer.choice === "q") {
            connection.end()
          }
          else (console.log("Sorry that item is not in our inventory"));
          promptUser();
        }

        if (checkInventory.quantity <= results[i].stock_quantity) {
          console.log(results[i].price * checkInventory.quantity)
        };
        if (checkInventory.quantity > results[i].stock_quantity) {
        console.log("Sorry that is not available")
          promptUser();
        };
      })
}