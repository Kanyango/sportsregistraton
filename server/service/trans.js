'use strict';
var mongoose = require('mongoose');
var request = require('request');

var trans = {

	create : function(req , res , next)
	{
		

		var fieldsToSet = {

			item    : req.body.item,
			amount  : req.body.amount,
			qtty    : req.body.qtty,
			user    : req.payload._id
		};

		req.app.db.models.Trans.create(fieldsToSet , 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
		req.app.db.models.User.update({_id : mongoose.Types.ObjectId(req.payload._id)},
			{$set: {smss: req.body.qtty}} , function(err , info){

				if(err)
				{
					return next(err);
				}

			});
				res.status(200).json(docs);
			});
	},
	/*kopokopo : function(req , res ,next)
	{
		var transaction = new req.app.db.models.Trans();
		
		transaction.trans_ref = req.body.transaction_reference;
		transaction.trans_time = req.body.transaction_timestamp;
		transaction.trans_sender_phone = req.body.sender_phone;
		transaction.amount = req.body.amount;
		transaction.currency = req.body.currency;
		
		transaction.save(function(err , body){
			if(err)
			{
				return next(err);
			}
		res.status(200).json(body);
		});
	},*/
	purchsms : function(req , res ,next)
	{
		req.app.db.models.Trans.find({trans_ref: req.body.transaction_reference ,
			trans_sender_phone: req.body.sender_phone , status: {$eq : null}},
			function(err , info){
			    if(err)
			{
				return next(err);
			}
		req.app.db.models.Trans.findOneAndUpdate({trans_ref: req.body.transaction_reference ,
			trans_sender_phone: req.body.sender_phone , status: {$eq : null}} ,
			{status: 'done'} , {new: true} ,
			function(err , data){
			if(err)
			{
				return next(err);
			}
			});
		res.status(200).json(info);
		});

	},
	kopokopo : function(req , res ,next)
	{
		var transaction = new req.app.db.models.Trans();
		
		transaction.trans_ref = req.body.transaction_reference;
		transaction.trans_time = req.body.transaction_timestamp;
		transaction.trans_sender_phone = req.body.sender_phone;
		transaction.amount = req.body.amount;
		transaction.currency = req.body.currency;
		
		transaction.save(function(err , body){
			if(err)
			{
				return next(err);
			}
		res.status(200).json(body);
		});
	}
}
module.exports = trans;
