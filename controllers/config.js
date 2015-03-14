//App's main module with dependencies for UI-Router and FireBase
var EatInApp = angular.module('EatInApp', []);
//Configures which states will activate which views and url's and what 
//their controllers will be.
EatInApp.config(function($routeProvider) {
	$routeProvider
		.when('/',
			{
				templateUrl: "search.html",
				controller: "AppCtrl"
			}
		)
});

EatInApp.controller("AppCtrl", function ($scope) {
	$scope.model = {
		message: "Starting over"
	}
})