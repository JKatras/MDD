function mainController($scope, $http) {
 	//var for unique App ID
 	$scope.appId = "4606347e";
 	//var for unique API Key
    $scope.apiKey = "2b0dc330fcebb3d65bdddc74aae878b3";
    //initialize API connection
    $scope.init = function() {
     	//URL parameters are hard-coded to 'onion soup' for testing purposes
     	//results returned will be JSONP format
        $http.jsonp('http://api.yummly.com/v1/api/recipes?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&q=onion+soup' + '&callback=JSON_CALLBACK').
        	//if successful connection, data console logged
        	success(function(data) {
            	console.log(data);
        	}).
        	//if not, error logged
        	error(function(error) {
 				console.log('Could not retrieve data');
        	});
    };
 
};