angular.module('wachezaji.reports', ['chart.js'])

.controller('ReportsController', function($scope, $http){

	$scope.data = []
	$scope.labels = []

	$http.get('/count')
	.then(function(res){
		$scope.counter = res.data;
		console.log($scope.counter);
		$scope.labels = $scope.counter.map(x => x._id);
		$scope.data = $scope.counter.map(x => x.count);
	});

	

	//$scope.data = [50, 30, 10, 60];
	//$scope.labels = ['nandi', 'kisumu', 'nairobi', 'marakwet'];
})
.controller('DiscGraphController', function($scope, $http){

	$http.get('/discipline')
	.then(function(res){
		$scope.counts = res.data;
		console.log($scope.counts);
		$scope.labels = $scope.counts.map(x => x._id);
		$scope.data = $scope.counts.map(x => x.count);
	});
})
.controller('SportGraphController', function($scope, $http){

	$http.get('/sport')
	.then(function(res){
		$scope.countre = res.data;
		console.log($scope.countre);
		$scope.labels = $scope.countre.map(x => x._id);
		$scope.data = $scope.countre.map(x => x.count);
	});
})
.controller('LevelGraphController', function($scope, $http){

	$http.get('/level')
	.then(function(res){
		$scope.countre = res.data;
		console.log($scope.countre);
		$scope.labels = $scope.countre.map(x => x._id);
		$scope.data = $scope.countre.map(x => x.count);
	});
})
.controller('StatusGraphController', function($scope, $http){

	$http.get('/status')
	.then(function(res){
		$scope.countre = res.data;
		console.log($scope.countre);
		$scope.labels = $scope.countre.map(x => x._id);
		$scope.data = $scope.countre.map(x => x.count);
	});
});








