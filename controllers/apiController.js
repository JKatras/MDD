var app = angular.module('EatInApp', []);

app.controller("apiController", function ($scope, $http) {
 	//var for unique App ID
 	$scope.appId = "4606347e";
 	//var for unique API Key
    $scope.apiKey = "2b0dc330fcebb3d65bdddc74aae878b3";
    //array that will contain search results
    $scope.results = [];
    $scope.links = [];
    //initialize API connection
    $scope.searchRecipes = function() {
    	$scope.results = [''];
     	//URL parameters are hard-coded to 'onion soup' for testing purposes
     	//results returned will be JSONP format
        $http.jsonp('http://api.yummly.com/v1/api/recipes?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&q=' + $scope.keyword + '&allowedIngredient=' + $scope.include + '&excludedIngredient=' + $scope.exclude + '&callback=JSON_CALLBACK').
        	//if successful return, parse data
        success(function(data) {
        		console.log(data); // **uncomment to view all returned data**
        		//forEach loop runs through matches, var assigned to recipeNames
        		//push names to results array
        	angular.forEach(data.matches, function(recipe, index) {
        		$scope.results.push(recipe);
    		});
    	//	console.log($scope.links);
        }). // success
    	//message in case of request error
    	error(function(error) {
			
		}); // error 
    }; // searchRecipes
    
    $scope.getDetails = function () {
    	$http.jsonp('http://api.yummly.com/v1/api/recipe/' + $scope.links[$this] + '?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&callback=JSON_CALLBACK').
    		success(function(data) {
    			console.log(data);
    		}). //success
    		error(function(error) {
    			console.log('Recipe not found');
    		}); // error
   
 	}; // getDetails
});