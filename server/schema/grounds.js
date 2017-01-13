'use strict';
module.exports = function(app , mongoose){

	var groundsSchema = new mongoose.Schema({
		
        name: {type: String},
        date_built : {type: Date},
        county: {type: String},
        
	});
	app.db.model('Ground' , groundsSchema);
};