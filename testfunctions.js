// Load the NPM Package inquirer
var inquirer = require("inquirer");

function orderitems(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please type the 'Id' of the item you would like to purchase?",
                name: "number"
            },
            {
                type: "input",
                message: "How many books would you like to purchase?",
                name: "number"
            },
            {
                type: "confirm",
                message: "Would you like to purchase anything else?",
                name: "confirm",
                default: "Yes"
            },
        ])
        // if yes or no then I want to promt the user to enter a new item.
        .then(function(inquirerResponse) {
            if (inquirerResponse.confirm) {
                console.log ("Thank you! You have one book in your cart");
            }
            else {
                console.log("Let's continue shopping! What other books are you interested in?");
                console.log("list of products");
                orderitems();
            }
        })
}

orderitems();