

var express = require('express');
var router = express.Router();

const mysql = require('mysql2');

var models = require('../models');  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// sequelize model:generate --name posts --attributes PostId:integer,PostTitle:string,PostBody:string,UserId:integer,createdAt:date,updatedAt:date