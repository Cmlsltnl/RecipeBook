(function () {
	angular.module('recipebook', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
	
	function config ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/' , {
				templateUrl: '/home/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/register' , {
				templateUrl: '/auth/register/register.view.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.when('/login' , {
				templateUrl: '/auth/login/login.view.html',
				controller: 'loginCtrl',
				controllerAs: 'vm'
			})
			.otherwise({ redirectTo: '/' });
			
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false,
			rewriteLinks: true
		});
	}
	
	angular
		.module('recipebook')
		.config(['$routeProvider', '$locationProvider', config]);
}) ();
	