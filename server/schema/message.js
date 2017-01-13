'use strict';

module.exports = function(app , mongoose){

	var messageSchema = new mongoose.Schema({
		
        user        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		dateSent    : {type : Date , default: Date.now()},
		message     : {type: String},
		from        : {type: String},
		to          : [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}],
		state       : {type: String}
	});
	app.db.model('Message' , messageSchema);
};