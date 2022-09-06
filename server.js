const express = require('express');
const app = express();
const port = process.env.PORT || 3000

var bodyParser = require('body-parser');

let router = require('./app/routers/router.js');

app.use(bodyParser.json());
app.get('/ngamplop', (req, res) => {
	res.send({
    message: "Welcome to Ngamplop"
  });
});
app.use('/ngamplop', router);
app.use('/resource', express.static('./resource'));

// Create a Server
app.listen(port, () => {
	console.log('Listening on port: ' + port)
})