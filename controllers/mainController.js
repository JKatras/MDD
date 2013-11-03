function mainController($scope, $http){
 	
 	$scope.appId = "4606347e";
    $scope.apiKey = "2b0dc330fcebb3d65bdddc74aae878b3";
    $scope.init = function() {
      
     	//URL parameters are hard-coded to 'onion soup' for testing purposes
        $http.jsonp({'http://api.yummly.com/v1/api/recipes?_app_id='+$scope.appId+'&_app_key='+$scope.apiKey+'&q=onion+soup'+'&callback=JSON_CALLBACK'}).//added 'headers' b/c of 405 error
        	success(function(data) {
            	console.log(data);
        	}).
        	error(function(error) {
 				console.log('Could not retrieve data');
        	});
    };
 
};