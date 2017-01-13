'use strict';
module.exports = function(app , mongoose){

	var expSchema = new mongoose.Schema({
		
        years: {type: String},
        title : {type: String},
        desc : {type: String},
        awards: [{name: String, issuer:String}],
        certs : [{name: String, issuer: String}]
	});
	app.db.model('Experience' , expSchema);
};