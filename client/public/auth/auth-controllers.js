var app = angular.module('myApp');

app.controller("loginController", ['$scope', '$location', 'authFactory', function($scope, $location, authFactory){
		$scope.$parent.username = '';
	$scope.login = function(){
		$scope.error = false;
		$scope.disable = true;
		console.log($scope.login.username, $scope.login.password);
		authFactory.loginUser($scope.login.username, $scope.login.password)
			.then(function(){
				$scope.$parent.username = $scope.login.username;
				$location.path('/events/create');
				$scope.disabled = false;
				$scope.login = {};
			})
			.catch(function(){
				$scope.error = true;
				$scope.errorMessage = "Invalid user name and/or password.";
				$scope.disabled= false;
				$scope.login = {};
			});

	}
}]);

app.controller("registerController", ['$scope', '$location', 'authFactory', function($scope, $location,authFactory){

	$scope.register = function(){
		$scope.error = false;
		$scope.disable = true;
		authFactory.registerUser($scope.register.username, $scope.register.password)
			.then(function(){
				$location.path('/events/create');
				$scope.diabled = false;
				$scope.register = {};
			})
			.catch(function(){
				$scope.error = true;
					$scope.errorMessage = "Oops. Something went wrong!";
					$scope.disabled= false;
					$scope.register = {};
			});

	}
}]);