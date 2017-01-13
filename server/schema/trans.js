'use strict';

module.exports = function(app , mongoose){

	var transSchema = new mongoose.Schema({
	
		trans_ref    : {type :String},
		trans_time   : {type : Date},
		trans_sender_phone   : {type : String},
		amount        : {type : String},
		currency      : {type: String},
		status        : {type: String}		
	});
	app.db.model('Trans' , transSchema);
};
