const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000

let router = require('./app/routers/router.js');

app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.send({
    message: "Welcome to Ngamplop"
  });
});
app.use('/', router);
app.use('/resource', express.static('./resource'));

// Create a Server
app.listen(port, () => {
	console.log('Listening on port: ' + port)
})