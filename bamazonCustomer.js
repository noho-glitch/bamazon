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
  displayProducts();
});


results = [];

var displayProducts = function() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for(var i = 0; i < results.length; i++) {
      console.log("\n" +
        results[i].item_id + " | " + results[i].product_name + " | "  + results[i].department_name + " | " + "$" + results[i].price + " | " + results[i].stock_quantity);
      }
      promptUser(results);

  })
}

//query database "bamazon_db" to display all items in table "products"
var promptUser = function(results) {
  


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
            choiceArray.push("q");
            return choiceArray;
          },
          message: "What item number would you like to purchase? ('q' to quit)"       
        },
        {
          name: "quantity",
          type: "number",
          message: "How many would you like to buy?"
        }
      ]).then(function(answer) {
        var chosenItem;
console.log(answer.choice)

        if (answer.choice === "q") {
          connection.end()
          return;
        }

        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            chosenItem = results[i]
           console.log("You chose: " + results[i].product_name);
          }

        }

        if (answer.quantity <= chosenItem.stock_quantity) {
          console.log(chosenItem.price * answer.quantity)

          connection.query("UPDATE products SET ? WHERE ?", [
            {
              stock_quantity: chosenItem.stock_quantity - answer.quantity
            },
            {
              item_id: chosenItem.item_id
            }

          ],function(err, results){
            if (err) throw err;

            displayProducts();
          });
        };



        if (answer.quantity > chosenItem.stock_quantity) {
        console.log("Sorry that is not available")
          displayProducts();
        };
      })
}