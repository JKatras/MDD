//App's main module with dependencies for UI-Router and FireBase
var EatInApp = angular.module('EatInApp', []);
//Configures which states will activate which views and url's and what 
//their controllers will be.
EatInApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider
		.when('/search',
			{
				templateUrl: 'views/search.html',
				controller: 'AppCtrl'
			}
		)
		.when('/about',
			{
				templateUrl: 'views/about.html',
				controller: 'AppCtrl'
			}
		)
		.otherwise({
			redirectTo: '/search'
		})
}]);

EatInApp.controller('AppCtrl', function ($scope) {
	$scope.message = 'Search View'
});