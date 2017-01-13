'use strict';
module.exports = function(app , mongoose){

	var sportsmenSchema = new mongoose.Schema({
		
        name: {type: String},
        dob : {type: Date},
        photo: {type: String},
        county: {type: String},
        gender: {type: String},
        sport: {type: String},
        phone : {type: String},
        email : {type: String},
        natid : {type: String},
        nationality : {type: String},
        kra_pin : {type: String},
        disciplines: {type: String},
        level : {type: String},
        levelOfEducation: {type: String},
        institution: {type: String},
        coach : {type: String},
      	gname : {type: String},
      	gphone : {type: String},
      	status: {type: String},
      	dateCreated: {type: Date, default: Date.now()},
      	performance: {type: mongoose.Schema.Types.ObjectId, ref: 'Performance'}
	});
	app.db.model('SportsMen' , sportsmenSchema);
};