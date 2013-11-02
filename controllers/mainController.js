function mainController($scope, $http){
 	
 	$scope.appId = "4606347e";
    $scope.apiKey = "2b0dc330fcebb3d65bdddc74aae878b3";
    $scope.init = function() {
      
        $http({method: 'GET', url: 'http://api.yummly.com/v1/api/recipes?_app_id=' + $scope.appId + '&_app_key=' + $scope.apiKey + '&q=onion+soup', headers:{'X-Requested-With': null}}).
        	success(function(data) {
            	console.log(data);
        	}).
        	error(function(error) {
 				console.log('Could not retrieve data');
        	});
    };
 
};