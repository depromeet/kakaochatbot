


var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

        fs.readFile( __dirname + "/../data/" + "keyboard.json", 'utf8', function (err, data) {
           console.log( JSON.stringify( JSON.parse( data ) ) );
           res.end( JSON.stringify( JSON.parse( data ) ) );

        });

});


module.exports = router;
