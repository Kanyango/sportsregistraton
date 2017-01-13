angular.module('wachezaji.dataService',[])
.factory('meanServe', ['$http','auth' ,  function($http , auth){

		//var base = "https://mybuddyapp.herokuapp.com/"; 
	var meanServe = {};

	meanServe.getUser = function()
	{

	return $http.get('/dash' ,
		 {headers : {Authorization: 'Bearer '+auth.getToken()}});

	};

	return meanServe;
}]);