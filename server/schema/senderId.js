'use strict';

module.exports = function(app , mongoose){

	var brandSchema = new mongoose.Schema({
		
		dateCreated : {type : Date,default: Date.now()},
		brand       : {type: String},
		user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		status      : {type: String}
				
	});
	app.db.model('Branded' , brandSchema);
};