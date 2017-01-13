'use strict';
var mongoose = require('mongoose');
var passport = require('passport'); 

var user = {

	create : function(req , res , next)
	{
		if(!req.body.username || !req.body.password)
		{
			res.status(400).json({message : 'Please fill out the fields'});
		}

		req.app.db.models.User.findOne({email: req.body.username ,
			phone: req.body.phone},
			function(err , user){
				if(user)
				{

					res.status(500).json({message : 'email already exists'});

				}
			});

		var user = new req.app.db.models.User();

		user.role   = req.body.role,
		user.recruiter = req.body.recruiter,
		user.orgname = req.body.orgname,
		user.industry = req.body.industry,
		user.position = req.body.pos,
		user.staff_name = req.body.sname,
		user.staff_phone = req.body.sphone,
		user.nationality = req.body.nation,
		user.nat_id = req.body.natid,
		user.email = req.body.username,
		user.phone = req.body.phone;
		user.setPassword(req.body.password)

		user.save(function(err){
			if(err)
			{
				return next(err);
			}

			return res.json({token: user.generateJwt()})
		});
  },

	login : function(req , res , next)
	{
		if(!req.body.username && !req.body.password)
		{
			return res.status(400).json({message : 'Error fill out the fields'});
		}
		passport.authenticate('local' , function(err , user , info){
			if(err){
				return next(err);
			}
			if(user)
			{
				return res.json({token : user.generateJwt()});
			}
			else{
				return res.status(401).json(info);
			}
		})(req , res , next);
	},

	update : function(req , res , next)
	{
	 	var fieldsToSet = {

	 		bname : req.body.bname,

	 	};
	 	var options = { new : true};

	 	req.app.db.models.User.findByIdAndUpdate(req.payload._id,
	 		fieldsToSet , options ,function(err , docs){
	 			if(err)
	 			{
	 				return next(err);
	 			}
	 			res.status(200).json(docs);
	 		});
	},

	readProfile : function(req  , res , next)
	{
		 if(!req.payload._id){
            res.status(401).json({
                "message" : "Unauthorized"
            });
        }
        else{

         req.app.db.models.User.findById(req.payload._id)
            .exec(function(err , user){
                res.status(200).json(user);
            });
        }
	},
	recover : function(req , res , next)
	{
		req.app.db.models.User.findById(req.payload._id)
		.exec(function(err , user){
			if(err)
			{
				return next(err);
			}
			res.status(200).json(user);
		});
	},
	sms : function(req , res ,next)
	{
		var id = req.payload._id;
		
		req.app.db.models.User.update({_id : mongoose.Types.ObjectId(id)},
					      {$inc: {smss: (req.body.items)}},
					     function(err , info){
			if(err)
			{
				return next(err);
			}
			res.status(200).json(info);
		 	});
	},
	getsms : function(req , res, next)
	{
		req.app.db.models.User.find({_id: mongoose.Types.ObjectId(req.payload._id)},
			function(err , info){
				if(err)
				{
					return next(err);
				}
				res.status(200).json(info);
			});
	},
	recruiters: function(req, res, next)
	{
		req.app.db.models.User.find({role: 'recruiter'}, 
			function(err, info){
				if(err)
				{
					return next(errr);
				}

				res.status(200).json(info);
			});
	},
	updateRec: function(req, res, next)
	{
		var id = mongoose.Types.ObjectId(req.body._id);

		var fieldsToSet = 
		{
			role: req.body.role,
			recruiter : req.body.recruiter,
			orgname : req.body.orgname,
			industry : req.body.industry,
			position : req.body.pos,
			staff_name : req.body.sname,
			staff_phone : req.body.sphone,
			nationality : req.body.nation,
			nat_id : req.body.natid,
			phone : req.body.phone
		};

		var options = { new : true};
		
		req.app.db.models.User.findByIdAndUpdate({_id: id},
	 		fieldsToSet , options ,function(err , docs){
	 			if(err)
	 			{
	 				return next(err);
	 			}
	 			res.status(200).json(docs);
	 		});
	},
  removeRec : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);

	    console.log('i was 2 b dltd' + id);

	  	req.app.db.models.User.findByIdAndRemove(id , 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			//res.status(200).json(info);
	  		});
	},
	recruitersrole: function(req, res, next)
	{
		console.log('iam the recruiter' + req.params.recruiter);

		req.app.db.models.User.find({email: req.params.recruiter},
			function(err, info){
				if(err)
				{
					return next(err);
				}
				res.status(200).json(info);
			});
	}
};
module.exports = user;
