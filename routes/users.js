

var express = require('express');
var router = express.Router();

var models = require('../models'); 
const authService = require("../services/auth");


/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Signup, Login, Logout

router.post('/signup', function(req, res, next) {
  
  models.users.findOrCreate({

      where: {
        Username: req.body.username
      },

      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })

    .spread(function(result, created) {

      if (created) {
        res.send('User successfully created');

      } else {
        res.send('This user already exists');
      }
    });
});


router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {

    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });

    } else {
      let passwordMatch = authervice.comparePasswords(req.body.password, user.Password);
      
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send('Login successful');

      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});


router.get('/login', function(req, res, next) {
  // res.redirect('/users/login')
  res.render("login");
});


router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });


router.get('/profile', function(req, res, next) {
  let token = req.cookies.jwt;
  
  if (token) {
    authService.verifyUser(token).then(user => {

          if (user) {
            models.users.findAll({
              where: { UserId: user.UserId },
              include: [{ model: models.posts }]
            });

            } else {
              res.status(401);
              res.send('Invalid authentication token');
            }
          });
    
      } else {
        res.status(401);
        res.send('Must be logged in');
          }
      });
    

router.get('/admin', 
  function (req, res, next) {
  
  if (req.user.Admin === true) {
    
    let viewUser = parseInt(req.params.id);
    models.users.findAll({ users
      })

      .then(user => {
        res.render('adminView', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Username: user.Username,
          Admin: user.Admin,
          createdAt: user.createdAt,
          UserId: user.UserId
        });
      });

  } else {
    res.send('Access Denied, please login as admin.');
  }
});


router.get('/admin/editUser/:id', 
  function (req, res, next) {
  
  if (req.user.Admin === true) {
    
    let viewUser = parseInt(req.params.id);
    models.users.find({
        where: {
          UserId: viewUser
        },
      })

      .then(user => {
        res.render('editUser', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Username: user.Username,
          Admin: user.Admin,
          createdAt: user.createdAt,
          UserId: user.UserId
        });
      });

  } else {
    res.send('Access Denied, please login as admin.');
  }
});
 

router.delete("/admin/deleteUser/:id", 
  function (req, res, next) {
    if (req.user.Admin === true) {

      let userId = parseInt(req.params.id);
      models.users
        .update(
          {
            Deleted: 'false'
          },

          {
            where: {
              UserId: userId
            }
          }
        )

        .then(track => {
          models.users
            .update(
              {
                Deleted: 'false'
              },

              {
                where: {
                  UserId: userId
                }
              }
            )

            .then(users => {
              res.redirect('/users');
            });
        });

    } else {
      res.send('Access Denied, please login as admin.');
    }
  });


module.exports = router;