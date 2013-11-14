var EatInApp = angular.module('EatInApp', ['appControllers']);

EatInApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl:'views/search.html'
	//	controller:'searchCtrl'
	//controller never works, has to be commented out
	}).
	when('/details/:id', {
		templateUrl: 'views/details.html',
		controller: 'detailCtrl'
	}).
	when('/login', {
		templateUrl: 'views/login.html'
	}).
	when('/signup', {
		templateUrl: 'views/signup.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);