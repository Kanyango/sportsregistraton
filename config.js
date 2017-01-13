//exports.port = process.env.hostname || localhost;
//exports.port = process.env.PORT || 7000;
exports.mongodb = {
	//uri: 'mongodb://127.0.0.1:27017/wachezaji'
	uri: 'mongodb://DaveBuddy:k3yb0@rd@ds163738.mlab.com:63738/sportsregistration'
};

exports.secret = 'b7TY?>m6wl_i/<';

exports.oauth = {

	'facebook' :{

		'clientID'    : '1091247900936084',
		'clientSecret': '941a60d3455544c0aa1ffbae17d3d95d',
		'callbackURL' : 'http://localhost:7000/oauth/facebook/callback'
	},

	'twitter' :{
		'consumerKey'    : 't3r87nEjaUpQpyayIzRwKPhOO',
		'consumerSecret' : 'OI5xaXTgkURzEKkIMbONQuYudAJTOq0mve509Vl39lW3iUFwrD',
		'callbackUrl' : 'http://localhost:7000/oauth/twitter/callback'
	}
};
