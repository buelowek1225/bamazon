var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
  
//   this will call for products and have then sent back and console.logged
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log ("============================================= BAMAZON: Available Cookbooks for Purchase ===============================================")
      printProducts(res);
    //   connection.end();
    });
}

// function to clearly print products
function printProducts(data) {
    for (var i = 0; i < data.length; i++) {
        console.log (data[i].id + ". " + data[i].product_name + " (Cookbook Genre: " + data[i].department_name + ", Books in stock: " + data[i].stock_quantity + "). Cost: $" + data[i].price);
    }
    orderitems();
}
// function to setup user prompts
function orderitems(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "\nPlease type the 'Id' of the item you would like to purchase.",
                name: "id"
            },
            {
                type: "input",
                message: "\nHow many would you like to purchase?",
                name: "number",
            },
        ])
        // if yes or no then I want to promt the user to enter a new item.
        .then(function(inquirerResponse) {
            // SELECT * FROM bamazon.products WHERE id=8;
            const queryString = `SELECT * FROM bamazon.products WHERE id=${inquirerResponse.id}`;
            // console.log(queryString);
            // connect to the database
            connection.query(queryString, function(err, res) {
                if (err) throw (err);
                // console.log(res);
                // check if there are enough products in stock
                if (res[0].stock_quantity >= inquirerResponse.number) {
                    // console.log(res[0].stock_quantity);
                    // console.log(inquirerResponse.number);
                    decreaseStock(inquirerResponse.id, inquirerResponse.number, res[0].stock_quantity);
                    printCustTotal(res[0].price, inquirerResponse.number);
                }
                else {
                    console.log(`Insufficient quanitiy. Only ${res[0].stock_quantity} book(s) are/is available for purchase.`)
                }
                connection.end();
            })
        })
}

function decreaseStock(id, numberOfOrderedItems, currentStock) {
    // connect to database
    // stock value - stock
    const updateQuery = `UPDATE bamazon.products SET stock_quantity=${currentStock-numberOfOrderedItems} WHERE id=${id}`;
    connection.query(updateQuery, function(err, res) {
        if (err) throw (err);
        // console.log(res);
    })
}

function printCustTotal(productCost, productNumber) {
    // take the number of res.items.requested * the cost of the product
    const totalCost = productCost * productNumber
    console.log("Your current total for the item(s) selected is $" + totalCost + "! Thank you for your loyalty to BAMAZON!!!");
}
