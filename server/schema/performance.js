'use strict';
module.exports = function(app , mongoose){

	var performanceSchema = new mongoose.Schema({

    part_event : {type: String},
    medal_won  : {type: String},
    position   : {type: String},
    other_awards: [{name: String, issuer: String}]

    	});
	app.db.model('Performance' , performanceSchema);
};