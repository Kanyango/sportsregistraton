'use strict';
module.exports = function(app , mongoose){

	var coachSchema = new mongoose.Schema({
		
        name: {type: String},
        dob : {type: Date},
        county: {type: String},
        gender: {type: String},
        sport: {type: String},
        levelOfEducation: {type: String},
      	experience: [{type: mongoose.Schema.Types.ObjectId, ref: 'Experience'}]
	});
	app.db.model('Coach' , coachSchema);
};