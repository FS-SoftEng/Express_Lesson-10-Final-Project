

var express = require('express');
var router = express.Router();

var models = require('../models'); 
const authService = require("../services/auth");


router.get('/', function(req, res, next) {
    let token = req.cookies.jwt;

    if (token) {
        authService.verifyUser(token).then(user => {
    
    if (user) {
        models.posts.findAll({
            where: { UserId: user.UserId, Deleted: false }
        })

        .then(result => res.render ("posts", { posts: result }));

        } else {
            res.status(401);
            res.send("Invalid authentication token");
        }
    });

        } else {
            res.status(401);
            res.send('Must be logged in');
        }
    });


router.get('/:id', function(req, res, next) {
    let viewUser = parseInt(req.params.id);
    models.users.findAll({ posts });
      });


router.post('/', function(req, res, next) {
    models.users.findOrCreate({
        defaults: {
          Title: req.body.title,
          Body: req.body.body
        }
      })
      .spread(function(result, created) {

        if (created) {
          res.send('Post successfully created');

        } else {
          res.send('This post already exists');
        }
      });
    });
    

router.delete('/:id', function(req, res, next) {

    if (req.user === true) {

        let post = parseInt(req.params.id);
        models.posts.update(
            {
              Deleted: 'true',
              Post: post
            }
        )
  
          .then(track => {
            models.posts.update(
                {
                  Deleted: 'true',
                  Post: post
                },
              )
  
              .then(users => {
                res.redirect('/posts');
              });
          });

        } else {
            res.redirect('posts');
          }
        });
    

router.put('/:id', function(req, res, next) {
    models.users.findOrCreate({
        defaults: {
          Title: req.body.title,
          Body: req.body.body
        }
      })
      .spread(function(result, created) {

        if (created) {
          res.send('Post successfully edited!');

        } else {
            res.send('Post not edited!');
          }
        });
      });


module.exports = router;