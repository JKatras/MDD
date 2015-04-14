var EatInApp = angular.module('EatInApp', ['ngRoute']);
EatInApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider
		.when('/search',
			{
				templateUrl: 'views/search.html',
				controller: 'ApiCtrl'
//				reloadOnSearch: false
			}
		)
		.when('/about',
			{
				templateUrl: 'views/about.html',
				controller: 'AppCtrl'
			}
		)
		.when('/search/results',
			{
				templateUrl: 'views/results.html'
//				reloadOnSearch: false
//				controller: 'ApiCtrl'
			}
		)
		.otherwise({
			redirectTo: '/search',			
		})
}]);

//EatInApp.controller('AppCtrl', function ($scope, $route, $location) {
//	$scope.current = $location.path();
//});

EatInApp.controller('ApiCtrl', function ($scope, $http, $location) {
	$scope.results = [];
	$scope.appId = '4606347e';
	$scope.apiKey = '2b0dc330fcebb3d65bdddc74aae878b3';
//	$scope.keyword = '';
//	$scope.include = '';
//	$scope.exclude = '';
	

		$scope.submit = function() {
			if ($scope.keyword || $scope.include || $scope.exclude) {
				
				$http.jsonp('http://api.yummly.com/v1/api/recipes?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&q=' + $scope.keyword + '&allowedIngredient[]=' + $scope.include + '&excludedIngredient[]=' + $scope.exclude + '&requirePictures=true&callback=JSON_CALLBACK').
			  success(function(data) {
//			  	$location.path('/search/results'); 
			  	angular.forEach(data.matches, function(recipe, index) {
			  		$scope.results.push(recipe);
					});
					$location.path('search/results'); 
					console.log(data.matches);
				});
			} else {
				$scope.error = "Please enter search terms and try again";
			}
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		};
});