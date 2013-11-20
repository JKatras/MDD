var EatInApp = angular.module('EatInApp', ["ui.router", "firebase"]);


EatInApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/search");
	$stateProvider
	.state('search', {
		url: '/search',
		templateUrl: 'views/search.html'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html'
	})
	.state('signup', {
		url: '/signup',
		templateUrl: 'views/signup.html',
		controller: function ($scope, angularFireCollection) {
			var ref = new Firebase("https://eatin-base.firebaseio.com/");
			$scope.profile = angularFireCollection(ref);
			$scope.createProfile = function () {
				$scope.profile.add({uname: $scope.username, pass: $scope.password, email: $scope.email, fname: $scope.firstname, lname: $scope.lastname});
			}
//			console.log($scope.profile)
		}
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'views/profile.html',
		controller: function ($scope, angularFireCollection) {
			var ref = new Firebase("https://eatin-base.firebaseio.com/");
			$scope.profile = angularFireCollection(ref);
		}
	})
	.state('search.results', {
		url: '/results',
		templateUrl: 'views/search.results.html',
		controller: function ($scope, $http) {
		 	//var for unique App ID
		 	$scope.appId = '4606347e';
		 	//var for unique API Key
		    $scope.apiKey = '2b0dc330fcebb3d65bdddc74aae878b3';
		    //array that will contain search results
		    $scope.results = [];
	     	//results returned will be JSONP format
	        $http.jsonp('http://api.yummly.com/v1/api/recipes?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&q=' + $scope.keyword + '&allowedIngredient=' + $scope.include + '&excludedIngredient=' + $scope.exclude + '&requirePictures=true&callback=JSON_CALLBACK').
        	//if successful return, parse data
	        success(function(data) {
	        
	        	console.log(data); // **uncomment to view all returned data**
	        	//forEach loop runs through matches, var assigned to recipeNames
	        	//push names to results array
	        	angular.forEach(data.matches, function(recipe, index) {
	        		$scope.results.push(recipe);
	    		});
	        }). // success
	    	error(function(error) {
				//message in case of request error
			}); // error
		} 
	})
	.state('details', {
		url: '/details/:id',
		templateUrl: 'views/details.html',
		controller: function ($scope, $http, $stateParams) {
			$scope.id = $stateParams.id;
//			$scope.details = [];
			$scope.appId = '4606347e';
    		$scope.apiKey = '2b0dc330fcebb3d65bdddc74aae878b3';
	    	$http.jsonp('http://api.yummly.com/v1/api/recipe/' +$stateParams.id
	    	+ '?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&callback=JSON_CALLBACK').
	    	success(function(data) {
	    		$scope.details = data;
	    		console.log($scope.details);
//				angular.forEach(data, function(detail, index) {
//					if (typeof data == "object") {
//						$scope.details.push(detail);
//					}
//	    		});
	    	//	console.log($scope.details);
	    	}). //success
	    	error(function(error) {
				console.log('Recipe not found');
			}); // error
			
	   	}
	})
});