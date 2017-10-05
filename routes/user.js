var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function(req, res, next){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        })
    })
});

router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Error Occured',
                error: err
            })
        }
        if(!user){
            return res.status(500).json({
                title: 'Login failed.',
                error: {message: 'Invalid credentials.'}
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(500).json({
                title: 'Login Failed.',
                error: {message: 'Invalid credentials.'}
            })
        }

        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: "Succesfully logged in.",
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;