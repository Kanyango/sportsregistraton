'use strict';
var mongoose = require('mongoose');
var request  = require('request');

var message = {

	create : function(req , res , next)
	{
			
		var fieldsToSet = {

			message : req.body.message,
			to      : req.body.bundle,
			from    : req.body.from,
			user    : req.payload._id
		};
		var tokeny = req.body.token;
		request({
	  		
	  		url: 'https://sms.solutions4mobiles.com/apis/sms/mt/v2/send',
	  		method: 'POST',
	  		headers: {
			        'Content-Type': 'application/json',
			        'Authorization' : 'Bearer ' + tokeny
			    },
	  		json : [{
	  				"to"      : req.body.rec,
			                "from"    : req.body.from,
			                "message" : req.body.message
  				}]
	         	},function(error , response , body){
	         		if(error)
	         		{
	         			return next(err);
	         		}
		req.app.db.models.Message.create(fieldsToSet , 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
	   req.app.db.models.User.update({_id: mongoose.Types.ObjectId(req.payload._id)},
			{$inc: {smss: -(req.body.ceci)}},
			function(err , info){

				if(err)
			{
				return next(err);
			}

			}); 
			
			//	res.status(200).json(docs);
			});
			res.status(200).json(body);	
	         	});
			
			
			
	},
	template : function(req ,res , next)
	{
		var template = new req.app.db.models.Message();

		template.message = req.body.message;
		template.state = req.body.content;
		template.user = req.payload._id;
		template.to = req.body.bundle;

		template.save(function(err , body){
			if(err)
			{
				return next(err);
			}
		res.status(200).json(body);
		});
	},
	read : function(req , res , next)
	{
		
		req.app.db.models.Message.find({user : req.payload._id})
		.populate('to' , 'name')
		.exec(
			function(err , docs)
			{
				if(err)
				{
					return next(err);
				}

				res.status(200).json(docs);
			});
	},
}
module.exports = message;
