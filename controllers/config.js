//App's main module with dependencies for UI-Router and FireBase
var EatInApp = angular.module('EatInApp', ["ui.router", "firebase"]);
//Configures which states will activate which views and url's and what 
//their controllers will be.
EatInApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/search");
	$stateProvider
//	search state is default view
	.state('search', {
		url: '/search',
		templateUrl: 'views/search.html'
	})
// navigates to About view
	.state('about', {
		url: '/about',
		templateUrl: 'views/about.html'
	})
// navigates to Login view/form; not currently functional.
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html'
	})
//	This controller will allow creation of user profile through
//	signup view and data going to FireBase. Not currently implemented.
	.state('signup', {
		url: '/signup',
		templateUrl: 'views/signup.html',
// When activated, will link to EatIn FireBase and push profile details to unique array
		controller: function ($scope, angularFireCollection) {
			var ref = new Firebase("https://eatin-base.firebaseio.com/");
			$scope.profile = angularFireCollection(ref);
			$scope.createProfile = function () {
				$scope.profile.add({uname: $scope.username, pass: $scope.password, email: $scope.email, fname: $scope.firstname, lname: $scope.lastname});
			}
		}
	})
//	Displays logged-in user's profile. Also not implemented.
	.state('profile', {
		url: '/profile',
		templateUrl: 'views/profile.html',
		controller: function ($scope, angularFireCollection) {
			var ref = new Firebase("https://eatin-base.firebaseio.com/");
			$scope.profile = angularFireCollection(ref);
		}
	})
//	Results view is nested inside search view.
//  Controller makes call to Yummly API
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
	        	//forEach loop runs through matches
	        	//push names to results array
	        	angular.forEach(data.matches, function(recipe, index) {
	        		$scope.results.push(recipe);
	    		});
	        }). // success
	    	error(function(error) {
				alert('Please check your search terms and try again')
			}); // error
		} 
	})
//  Details view replaces main search view
//  Another call is made to API	
	.state('details', {
		//unique recipe ID fetched from results of clicked item
		url: '/details/:id',
		templateUrl: 'views/details.html',
		controller: function ($scope, $http, $stateParams) {
			//includes recipe id in url parameters
			$scope.id = $stateParams.id;
			$scope.appId = '4606347e';
    		$scope.apiKey = '2b0dc330fcebb3d65bdddc74aae878b3';
	    	$http.jsonp('http://api.yummly.com/v1/api/recipe/' +$stateParams.id
	    	+ '?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&callback=JSON_CALLBACK').
	    	success(function(data) {
	    		$scope.details = data;
	    		console.log($scope.details);
	    	}). //success
	    	error(function(error) {
				alert('Recipe not found');
			}); // error
			
	   	}
	})
});