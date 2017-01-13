angular.module('wachezajilist', [])

.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }])
.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);
 
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined 
                      }
           })
           .then(function(response){
            var pload = response.data;
            console.log(pload);
            for(var l = 0; l < pload[0].length; l++)
              { 
                  console.log(pload[0][l]) 
              }
              this.k = pload[0];
              console.log(this.k);
            /*$http.post('/exel', this.k , 
              {headers:{Authorization: 'Bearer ' + auth.getToken()}})
            .then(function(res){
              var ploady = res.data;
              console.log(ploady);
            });*/
           });
        }
     }])

.controller('WachezajiController', function($scope, $http, $uibModal, auth, fileUpload, $window , meanServe){


   $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
  //meanServe.getUser().success(function(data){
    //$scope.user = data;
  //});
      $scope.logOut = auth.logOut;
      $scope.recruiter =  $scope.currentUser();
       console.log($scope.recruiter);


    $http.get('/recruitersrole/' + $scope.recruiter)
      .then(function(res){
      $scope.role = res.data;
      console.log($scope.role);
      console.log($scope.role[0].role);
      if(typeof $scope.role[0].role === 'admin')
      {
        $scope.dont = 'onyesha';
      }
      else
      {
        $scope.dont = 'ficha';
      }
    });

     
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
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = true;

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
.controller('CreateMchezajiController', 
    function ($http , $scope , $uibModalInstance, fileUpload) {



    	 $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = "/upload";
           fileUpload.uploadFileToUrl(file, uploadUrl);
        };

    $scope.update = function()
    {
            $http.post('/wachezaji', $scope.mchezaji);
    }
    

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
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
});