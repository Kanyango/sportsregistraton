angular.module('wachezaji',
	['ui.router',
	'ui.bootstrap',
	'angular.morris-chart',
	'wachezajilist',
	'wachezaji.reports',
	'wachezaji.createplayer',
	'wachezaji.auth',
	'wachezaji.signin',
	'wachezaji.signup',
	'wachezaji.dataService',
	'wachezaji.admin',
	'wachezaji.adminsignin'
	])
.config(function($stateProvider , $urlRouterProvider , $httpProvider){

	$stateProvider
	.state('wachezaji',
		    {
		     url: '/wachezaji',
		     templateUrl: 'modules/wachezaji/wachezaji.html',
		     controller: 'WachezajiController'
		  })
	.state('reports',
		    {
		     url: '/reports',
		     templateUrl: 'modules/reports/reports.html',
		     controller: 'ReportsController'
		  })
	.state('createplayer',
		    {
		     url: '/createplayer',
		     templateUrl: 'modules/wachezaji/createmchezaji.html',
		     controller: 'CreateMchezajiController'
		  })
	.state('signup',
		    {
		     url: '/signup',
		     templateUrl: 'signup.html',
		     controller: 'SignUpController'
		  })
	.state('signin',
		    {
		     url: '/signin',
		     templateUrl: 'login.html',
		     controller: 'SignInController'
		  })
	.state('adminpage',
		    {
		     url: '/adminpage',
		     templateUrl: 'modules/admin/admin.html',
		     controller: 'AdminController'
		  })
	.state('admin',
		    {
		     url: '/admin',
		     templateUrl: 'modules/admin/admin_login.html',
		     controller: 'AdminLogInController'
		  })
	$urlRouterProvider.otherwise('/wachezaji');
});
