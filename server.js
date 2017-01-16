
/**
* Create app
**/
var express = require('express');
var app     = express();
const PORT  = process.env.PORT || 8080;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  next();
});
app.use(express.static('bower_components'));
app.use(express.static('app'));
app.use(function(req, res) {
  res.sendfile(__dirname + '/app/index.html');
});

app.listen(PORT, function(){
  console.log('Server up using port ' + PORT);
});
