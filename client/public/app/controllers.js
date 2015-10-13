
var app = angular.module('myApp');

app.controller("myController", ['$scope', function($scope){
	
		$scope.title = "Rezo - Book It!";
	  $scope.action = {};
	  $scope.action.bootstrap = "";
		$scope.action.message = "";
		$scope.collections = {};
		$scope.collections.newItem = {};
		$scope.update = false;
		$scope.username = '';
}]);











