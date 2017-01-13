angular.module('wachezaji.createplayer', [])

.controller('CreateMchezajiController', function($scope, $http, $state){

	$scope.counties = ['Baringo', 'Bomet', 'Bungoma', 'Elgeyo Marakwet', 'Embu',
				'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega',
				'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu',
				'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni',
				'Mandera', 'Meru', 'Migori', 'Marsabit', 'Mombasa', 'Muranga',
				'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
				'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River',
				'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu',
				'Vihiga', 'Wajir', 'West Pokot'];

	$scope.save = function()
	{
		console.log($scope.mchezaji);
		$http.post('/wachezaji', $scope.mchezaji);
		$state.go('wachezaji');
	}

})