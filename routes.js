'use strict';

var mongoose = require('mongoose');
var config = require('./config');
var jwt = require('express-jwt');
var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
var passport = require('./passport');
var user    = require('./server/service/user');
var sptsmen    = require('./server/service/sportmen');
//var coach   = require('./server/service/coach');


module.exports = function(app , passport)
{  
    //wachezaji routes
    app.post('/wachezaji', sptsmen.create)
    app.get('/wachezaji', sptsmen.read)
    app.put('/wachezaji', sptsmen.update)
    app.delete('/wachezaji/:id', sptsmen.remove)
    //app.post('/upload', sptsmen.upload)

    //report routes
    app.get('/count', sptsmen.count);
    app.get('/discipline', sptsmen.disc);
    app.get('/sport', sptsmen.sport);
    app.get('/level', sptsmen.level);
    app.get('/status', sptsmen.statu);
    //roles

    app.get('/recruitersrole/:recruiter', user.recruitersrole);

    //recruiters
    app.get('/recruiters', user.recruiters);
    app.put('/recruiters', user.updateRec);
    app.delete('/recruiters/:id', user.removeRec);

    app.post('/session/create' , user.create);
    app.post('/login' , user.login);
    app.get('/dash', auth , user.readProfile);


    app.get('/logout' , function(req , res){
        	req.logout();
        	res.redirect('/');
        });
    	//app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

};
