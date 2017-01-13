angular.module('wachezaji.auth',[])

.factory('auth', ['$http','$window','$location', function($http , $window , $location){

 		//var base = "http://localhost:8100";

	function redirect(url)
	{
		url = url || '/';
		$location.path(url);
	}
	
	var auth = {};
    
    var deferredCurrentUser;

	auth.saveToken = function(token)
	{
		$window.localStorage['wachezaji-app-token'] = token;
	};
	auth.getToken = function()
	{
		return $window.localStorage['wachezaji-app-token'];
	};

	auth.isLoggedIn = function()
	{
		var token = auth.getToken();

		if(token)
		{
			var payload = JSON.parse($window.atob(token.split('.')[1]));
		    return payload.exp > Date.now() / 1000;

		}
		else{

			return false;
		}
	};

	auth.currentUser = function()
	{

		if(auth.isLoggedIn()){
		var token = auth.getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.email;
      }
	};

	auth.register = function(user)
	{
		return $http.post('/session/create', user).success(function(data){
			auth.saveToken(data.token);
		});
	};
	auth.login = function(user)
	{
		return $http.post('/login', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function(redirectTo)
	{
		//return $http.post('/logout').success(function(){
			$window.localStorage.removeItem('wachezaji-app-token');
			redirect(redirectTo);
		//});
	};

	return auth;
}]);