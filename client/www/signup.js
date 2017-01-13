angular.module('wachezaji.signup',[])

.controller('SignUpController', function($scope, $http, $state, auth){


	$scope.industries = ['Education', 'Manufacturing', 'Engineering', 
						 'Banking', 'Telecommunication', 'Real Estate',
						 'Information Technology', 'Government Administration',
						 'Entertainmet', 'Hospitality', 'Insurance', 'Investment',
						 'Law Enforcement', 'Tourism & Hotel', 'Media', 'Publishing',
						 'Advertising', 'Religious Institution', 'Sports'];

	$scope.user = {};

	$scope.user.role = 'recruiter';

	$scope.signup = function()
	{
		    auth.register($scope.user).
		    success(function(res){
		    	$state.go('wachezaji');
			}).error(function(resp , status , headers){
				$scope.resp = status;
				if($scope.resp > 299)
				{
					$scope.min = 'error';
				}
			});
	};
	
})