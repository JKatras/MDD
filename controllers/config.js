var EatInApp = angular.module('EatInApp', ['appControllers']);

EatInApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl:'views/results.html'
	//	controller:'searchCtrl'
	}).
	
	when('/details/:id', {
		templateUrl: 'views/details.html',
		controller: 'detailCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);