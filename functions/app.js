const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

var bodyParser = require('body-parser');

let routerApps = require('../app/routers/router.js');

// app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.send({
    message: "Welcome to DhuwitKu"
  });
});
// app.use('/', routerApps);
// app.use('/resource', express.static('./resource'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', __dirname);

// app.get('/privacypolicy', function(req, res){
//   res.render('./app/view/privacypolicy');
// });

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);