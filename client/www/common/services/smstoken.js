angular.module('buddySms.smstoken' , [])

.factory('tokensms', ['$http','$window', function($scope ,$window){

	var tokensms = {};

	tokensms.saveToken = function(token)
	{
		$window.localStorage['sms_access_token'] = token;
	};

	tokensms.checkToken = function()
	{
		return $window.localstorage['sms_access_token'];
	};



	return tokensms;
}])