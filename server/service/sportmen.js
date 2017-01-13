'use strict';
var mongoose = require('mongoose');
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');

var sptsmen = {

	create : function(req , res , next)
	{
		var storage = multer.diskStorage({
	  		destination: function(request , file , callback)
	  		{
	  			callback(null , './server/uploads');
	  		},
	  		filename: function (request, file, callback) {
		    callback(null, file.originalname)
		  }
	  	});
	  	var upload = multer({ storage: storage }).single('file');
	  	upload(req, res, function(err){
	  		if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
	  	})
		var fieldsToSet = {

			name    : req.body.name,
			dob     : req.body.dob,
			phone   : req.body.phone,
			email   : req.body.email,
			county  : req.body.county,
			gender  : req.body.gender,
			sport   : req.body.sport,
			disciplines  : req.body.ath,
			kra_pin  : req.body.krapin,
			nationality  : req.body.nation,
			natid   : req.body.natid,
			level : req.body.level,
			levelOfEducation  : req.body.levelOfEducation,
			gname  : req.body.gname,
			gphone  : req.body.gphone,
			status  : req.body.status,
			institution  : req.body.institution,
			coach  : req.body.coach
		};

		req.app.db.models.SportsMen.create(fieldsToSet, function(err, info){

			if(err)
			{
				return next(err)
			}
			res.status(200).json(info)
		});

	},
	read : function(req , res , next)
	{
		req.app.db.models.SportsMen.find({},function(err, info){
			if(err)
			{
				return next(err)
			}
			res.status(200).json(info)
			console.log(info)
		});
	},
	update : function(req , res , next)
	{
		var id = req.body._id;
		var fieldsToSet = {

			name    : req.body.name,
			dob     : req.body.dob,
			phone   : req.body.phone,
			email   : req.body.email,
			county  : req.body.county,
			gender  : req.body.gender,
			sport   : req.body.sport,
			disciplines  : req.body.ath,
			kra_pin  : req.body.krapin,
			nationality  : req.body.nation,
			natid   : req.body.natid,
			level : req.body.level,
			levelOfEducation  : req.body.levelOfEducation,
			gname  : req.body.gname,
			gphone  : req.body.gphone,
			status  : req.body.status,
			institution  : req.body.institution,
			coach  : req.body.coach
		};

		var options = { new : true };

		req.app.db.models.SportsMen.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});

	},
	remove : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);

	    console.log('i was 2 b dltd' + id);

	  	req.app.db.models.SportsMen.findByIdAndRemove(id , 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			//res.status(200).json(info);
	  		});
	},
	count : function(req , res , next)
	{

		req.app.db.models.SportsMen.aggregate(
		[
		{
			$group:  
			 {	        _id : "$county",
						count :{ $sum: 1}
					}
				}
			],
			 function(err, docs){

			if(err)
			{
				return next(err);
			}
			res.status(200).json(docs);
			console.log(docs);
		});	
	},
	disc : function(req , res , next)
	{

		req.app.db.models.SportsMen.aggregate(
		[
		{
			$group:  
			 {	        _id : "$disciplines",
						count :{ $sum: 1}
					}
				}
			],
			 function(err, docs){

			if(err)
			{
				return next(err);
			}
			res.status(200).json(docs);
			console.log(docs);
		});

	  	
	},
	sport : function(req , res , next)
	{

		req.app.db.models.SportsMen.aggregate(
		[
		{
			$group:  
			 {	        _id : "$sport",
						count :{ $sum: 1}
					}
				}
			],
			 function(err, docs){

			if(err)
			{
				return next(err);
			}
			res.status(200).json(docs);
			console.log(docs);
		});

	  	
	},
	level : function(req , res , next)
	{

		req.app.db.models.SportsMen.aggregate(
		[
		{
			$group:  
			 {	        _id : "$level",
						count :{ $sum: 1}
					}
				}
			],
			 function(err, docs){

			if(err)
			{
				return next(err);
			}
			res.status(200).json(docs);
			console.log(docs);
		});
	},
	statu : function(req , res , next)
	{

		req.app.db.models.SportsMen.aggregate(
		[
		{
			$group:  
			 {	        _id : "$status",
						count :{ $sum: 1}
					}
				}
			],
			 function(err, docs){

			if(err)
			{
				return next(err);
			}
			res.status(200).json(docs);
			console.log(docs);
		});

	  	
	}
}
module.exports = sptsmen;
