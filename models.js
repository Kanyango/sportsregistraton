'use strict';


module.exports = function(app , mongoose)
{
	require('./server/schema/sportsmen')(app , mongoose);
	require('./server/schema/coaches')(app , mongoose);
	require('./server/schema/performance')(app , mongoose);
	require('./server/schema/experience')(app , mongoose);
	require('./server/schema/user')(app , mongoose);
}