'use strict';

module.exports = function(app , mongoose){

	var contactSchema = new mongoose.Schema({
		
        user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		dateCreated : {type : Date,default: Date.now()},
		name        : {type: String},
		email       : {type: String},
		value       : {type : mongoose.Schema.Types.Mixed},
		messages    : [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]		
	});
	app.db.model('Contact' , contactSchema);
};