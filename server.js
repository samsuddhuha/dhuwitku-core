const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/dbConfig.js');
  
// force: true will drop the table if it already exists
let boolDb = false
db.sequelize.sync({force: boolDb}).then(() => {
  console.log('Drop and Resync with { force: ${boolDb} }');
}); 

let router = require('./app/routers/router.js');

app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.send({
    message: "Welcome to Daur Plus"
  });
});
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("App listening at http://%s:%s", host, port); 
})