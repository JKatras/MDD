var app = angular.module('EatInApp', [])

app.config(function ($routeProvider) {
	$routeProvider.when('/',
		{
			templateUrl:'views/results.html' ,
			controller:'apiController'
		})
});