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
    // console.log("connected as id " + connection.threadId);
    managerOptions();
    // connection.end();
});

// function to prompt manager
function managerOptions(){
    inquirer
        .prompt([
            {
                type: "list",
                name: "managerOptions", 
                message: "Please select the application you wish to run or choose to ecit the program.",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Products",
                    "Exit BAMAZON Manager Program View"]
            },
        ])
        // based on selection then the following will run
        .then(function(inquirerResponse) {
           if (inquirerResponse.managerOptions === "View Products for Sale") {
               console.log("Products Available to Customers:");
               viewProducts();
            } else if (inquirerResponse.managerOptions === "View Low Inventory") {
               console.log("View Low Inventory");
               viewLowInventory();
            } else if (inquirerResponse.managerOptions === "Add to Inventory") {
                console.log("Add to Inventory");
                increaseInventory();
            } else if (inquirerResponse.managerOptions === "Add New Products") {
                console.log("Add New Products");
                addNewProducts();
            } else if (inquirerResponse.managerOptions === "Exit BAMAZON Manager Program View") {
                console.log("\n**************************************************\n\nThank you for using BAMAZON ManagerView! Goodbye.\n\n**************************************************\n");
                connection.end();
            }
        })
}


//  function View Products for Sale
function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log ("\n============================================= BAMAZON: Available Cookbooks for Purchase ===============================================\n")
    printProducts(res);
    console.log("\n\nWould you like to make another select?")
    connection.end();
    managerOptions();
    });
}
// function to clearly print products
function printProducts(data) {
    for (var i = 0; i < data.length; i++) {
        console.log (data[i].id + ". " + data[i].product_name + " (Cookbook Genre: " + data[i].department_name + ", Books in stock: " + data[i].stock_quantity + "). Cost: $" + data[i].price);
    }
}
//  function View Low Inventory
function viewLowInventory() {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity<5;", function(err, res) {
    if (err) throw err;
    console.log ("\n============================================= BAMAZON: Available Cookbooks for Purchase ===============================================\n")
    printProducts(res);
    console.log("\n\nWould you like to make another selection?")
    connection.end();
    // managerOptions();
    });
}

// function Add to Inventory
function increaseInventory() {
    console.log(`
    LETS UPDATE OUR INVENTORY!!!
    `);
    // printProducts();
    // printProducts(data);
    inquirer
    .prompt([
        {
            type: "input",
            message: "\nPlease enter the product ID of the item you wish to update.",
            name: "id",
        },
        {
            type: "input",
            message: "\nHow many new products are in inventory?",
            name: "inventoryNumberUpdate",
        },
    ])
    .then(function(response){
        // console.log(response);
        const queryString = `SELECT * FROM bamazon.products WHERE id=${response.id}`;
        connection.query(queryString, function(err, res) {
            if (err) throw (err);
            // console.log (res);
            // console.log("Thank you :)")
            increaseStock(response.id, response.inventoryNumberUpdate, res[0].stock_quantity);
            managerOptions();
        })
    })
}  

function increaseStock(id, inventoryNumberUpdate, currentStock) {
    const inventoryUpdateString = `UPDATE bamazon.products SET stock_quantity=${currentStock}+${inventoryNumberUpdate} WHERE id=${id}`;
    console.log(inventoryUpdateString);
    connection.query(inventoryUpdateString, function(err, res) {
        if (err) throw (err);
    console.log (res);
    })
}



// function Add new Products
function addNewProducts(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new product you would like to add to the Bamazon inventory?",
            name: "inventoryAdditionProductName",
            // validate: function inventoryAdditionProductName(name){
            //     return name !== ''}
        },
        {
            type: "input",
            message: "What department will this product be associated with?",
            name: "inventoryAdditionDepName",
            // validate: function inventoryAdditionDepName(name){
            //     return name !== ''}
        },
        {
            type: "input",
            message: "How much will this product retail for on BAMAZON?",
            name: "inventoryAdditionPrice",
            // validate: function inventoryAdditionPrice(name){
            //     return name !== ''}
        }, 
        {
            type: "input",
            message: "How many of the new product do we we have in stock?",
            name: "inventoryAdditionStockQuantity",
            // validate: validateQuantity
        },
    ]).then(function(addProduct) {
        // console.log(addProduct);
        const newProductString = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (
        "${addProduct.inventoryAdditionProductName}", 
        "${addProduct.inventoryAdditionDepName}", 
        ${addProduct.inventoryAdditionPrice}, 
        ${addProduct.inventoryAdditionStockQuantity})`;
        // console.log(newProductString);
        connection.query(newProductString, function(err, response) {
            if (err) throw (err);
            // console.log (response)
            console.log(`\n\nYou have added a new product into inventory! ${addProduct.inventoryAdditionProductName} was added to the complete list of products available on BAMAZON.\n\n`)
            managerOptions();
        })
    })
};

function validateQuantity(stockNumber)
{
   var isValid = !_.isNaN(parseFloat(stockNumber));
   return isValid || "Please enter a number.";
}



















// function decreaseStock(id, numberOfOrderedItems, currentStock) {
//     // connect to database
//     // stock value - stock
//     const updateQuery = `UPDATE bamazon.products SET stock_quantity=${currentStock-numberOfOrderedItems} WHERE id=${id}`;
//     connection.query(updateQuery, function(err, res) {
//         if (err) throw (err);
//         // console.log(res);
//     })
// }

// function printCustTotal(productCost, productNumber) {
//     // take the number of res.items.requested * the cost of the product
//     const totalCost = productCost * productNumber
//     console.log("Your current total for the item(s) selected is $" + totalCost + "! Thank you for your loyalty to BAMAZON!!!");
// }
