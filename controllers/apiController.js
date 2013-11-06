var app = angular.module('EatInApp', []);

app.controller("apiController", function ($scope, $http) {
 	//var for unique App ID
 	$scope.appId = "4606347e";
 	//var for unique API Key
    $scope.apiKey = "2b0dc330fcebb3d65bdddc74aae878b3";
    $scope.results = [];
    //initialize API connection
    $scope.init = function() {
     	//URL parameters are hard-coded to 'onion soup' for testing purposes
     	//results returned will be JSONP format
        $http.jsonp('http://api.yummly.com/v1/api/recipes?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&q=onion+soup' + '&callback=JSON_CALLBACK').
        	//if successful connection, data console logged
        	success(function(data) {
        		console.log(data);
        //    	console.log(data.matches[1].recipeName);
//	        	angular.forEach(data, function(value, index) {
//	        		var matches = data.matches;
//	        		console.log(matches);
//	        		$scope.results.push(recipe);
//	        		console.log($scope.results);
//        		}); //angular.forEach
        	}).error(function(error) {
				console.log('Could not retrieve data');

    		}); //.error
    	$http.jsonp('http://api.yummly.com/v1/api/recipe/Onion-Soup-without-Tears-443154?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&callback=JSON_CALLBACK').
    		success(function(data) {
    			console.log(data);
    		}).error(function(error) {
    			console.log('Recipe not found');
    		});
    }; //init
 
});