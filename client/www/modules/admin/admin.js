angular.module('wachezaji.admin', [])

.controller('AdminController', function($scope, $http, $uibModal, $window, auth){

	$scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = true;

     $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
  //meanServe.getUser().success(function(data){
    //$scope.user = data;
  //});
      $scope.logOut = auth.logOut;
    
    
    if(typeof $window.localStorage['wachezaji-app-token'] === 'undefined' || typeof $window.localStorage['wachezaji-app-token'] === null )
    {
      $scope.show = 'never';
      console.log($scope.show);
    }
    else
    {
      $scope.show = 'onyesha';
            console.log($scope.show);
    }

	$http.get('/wachezaji')
	.then(function(res){
		$scope.wachezaji = res.data;
		console.log($scope.wachezaji);
    $scope.totalItems = $scope.wachezaji.length;
	});
	  $scope.currentPage = 1;
    $scope.numPerPage = 5;

      $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.wachezaji.indexOf(value);
            return (begin <= index && index < end);
          };
      $scope.edit = function(mchezaji)
        {
            var modalInstance = $uibModal.open({
            templateUrl : 'modules/wachezaji/editmchezaji.html',
            controller  : 'EditMchezajiController',
            size : 'lg',
             resolve : {

                mchezaji : function() {
                    return  mchezaji;
                }
            }
        });
       
    }
    $scope.delete = function(id)
    {
      console.log(id)
        $http.delete('/wachezaji/'+ id)
    }

})
.controller('EditMchezajiController', 
    function ($http , $scope , $uibModalInstance, mchezaji) {

    	$scope.mchezaji = mchezaji

    $scope.counties = ['Baringo', 'Bomet', 'Bungoma', 'Elgeyo Marakwet', 'Embu',
        'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega',
        'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu',
        'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni',
        'Mandera', 'Meru', 'Migori', 'Marsabit', 'Mombasa', 'Muranga',
        'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
        'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River',
        'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu',
        'Vihiga', 'Wajir', 'West Pokot'];


    $scope.update = function()
    {
            $http.put('/wachezaji', $scope.mchezaji);
    }
    

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('RecruitController', function($scope, $http, $uibModal){

	$scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = true;

	$http.get('/recruiters')
	.then(function(res){
		$scope.recruiters = res.data;
		console.log($scope.recruiters);
    $scope.totalItems = $scope.recruiters.length;
	});

	  $scope.currentPage = 1;
      $scope.numPerPage = 5;

      $scope.paginate = function(value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.recruiters.indexOf(value);
            return (begin <= index && index < end);
       };
       $scope.edit = function(recruiter)
        {
            var modalInstance = $uibModal.open({
            templateUrl : 'modules/admin/editrecruiter.html',
            controller  : 'EditRecruiterController',
            size : 'lg',
             resolve : {

                recruiter : function() {
                    return  recruiter;
                }
            }
        });
       
    }
    $scope.delete = function(id)
    {
      console.log(id)
        $http.delete('/recruiters/'+ id)
                        
    }
})
.controller('EditRecruiterController', 
    function ($http , $scope , $uibModalInstance, recruiter) {

        $scope.recruiter = recruiter

    $scope.industries = ['Education', 'Manufacturing', 'Engineering', 
                         'Banking', 'Telecommunication', 'Real Estate',
                         'Information Technology', 'Government Administration',
                         'Entertainmet', 'Hospitality', 'Insurance', 'Investment',
                         'Law Enforcement', 'Tourism & Hotel', 'Media', 'Publishing',
                         'Advertising', 'Religious Institution', 'Sports'];

    $scope.update = function()
    {
            $http.put('/recruiters', $scope.recruiter);
    }
    

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});