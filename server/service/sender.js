'use strict';
var mongoose = require('mongoose');

var branded = { 

		
		idReq : function(req , res ,next)
		{
			var fieldsToSet = 
			{
				brand  : req.body.branded,
				user   : req.payload._id
			}
			req.app.db.models.Branded.create( fieldsToSet , 
				function(err , docs ){
					if(err)
					{
						return next(err)
					}
					res.status(200).json(docs);
				});
		}
	}
module.exports = branded;