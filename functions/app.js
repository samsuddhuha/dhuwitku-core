const express = require('express');
const serverless = require('serverless-http');
const app = express();
const path = require("path");

let bodyParser = require('body-parser');
app.use(bodyParser.json());
// router.get('/', (req, res) => {
// 	res.send("Welcome to DhuwitKu");
// });
// router.use('/', routerApps);
// router.use('/resource', express.static('./resource'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// const publicPath = path.join(__dirname, '../app');
// app.set('views', publicPath);

let routerApps = require('../app/routers/router.js');
// routerApps.get('/privacypolicy', function(req, res){
//   res.render('../app/view/privacypolicy');
// });

app.use("/.netlify/functions/app", routerApps);
module.exports.handler = serverless(app);