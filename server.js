const express = require('express');
const app = express();
const port = process.env.PORT || 8080

var bodyParser = require('body-parser');
 
const db = require('./app/config/dbConfig.js');

// force: true will drop the table if it already exists
let boolDb = false
// db.Product.sync({force: boolDb}).then(() => {
//   console.log('Drop and Resync with { force: ${boolDb} }');
// });
db.sequelize.sync({force: boolDb}).then(() => {
  console.log('Drop and Resync with { force: ${boolDb} }');
});

let router = require('./app/routers/router.js');

app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.send({
    message: "Welcome to BisnisPlus"
  });
});
app.use('/', router);
app.use('/resource', express.static('./resource'));

// Create a Server
app.listen(port, () => {
	console.log('Listening on port: ' + port)
})