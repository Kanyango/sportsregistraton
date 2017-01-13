angular.module('wachezaji.signin',[])

.controller('SignInController', function($scope, $http, auth, $state){

	$scope.user = {};
		
		$scope.login = function()
		{
			console.log($scope.user);
			auth.login($scope.user)
			.error(function(data , status , headers){
				$scope.min = data.message;
			})
			.success(function(response){
				$state.go('wachezaji');
			});
		};
	
})