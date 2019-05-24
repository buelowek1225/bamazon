var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // my port;
  port: 3306,

  // my username
  user: "root",

  // my password
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
      console.log(res);
      connection.end();
    });
  }
  
// another options

//   function afterConnection() {
//     // SELECT sends data back to your (res-response) we are filtering forbooks from the department "Ottolengi Cuisine"
//     connection.query("SELECT * FROM products WHERE department_name='Ottlengi Cuisine'", function(err, res) {
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
//   }