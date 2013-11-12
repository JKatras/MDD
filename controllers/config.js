var app = angular.module('EatInApp', [])

app.config(['$routeProvider', function (r) {
	r.when('/',
		{
			templateUrl:'views/results.html',
		//	controller:'apiController'
		}).
	when('/details/:id',
		{
			templateUrl: 'views/details.html'
		});
}]);