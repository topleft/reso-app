


angular.module('eventDirectives').
	directive("formBasicsTemplate", [function(){
		return {
			restrict: 'E',
			scope: {
				basics: "="
			},
			templateUrl: "form-basics/form-basics.html",
			controller: function($scope){
				console.log("basics")
				$scope.basics = {};
				$scope.basics.date
				$scope.basics.start
				$scope.basics.end
				$scope.basics.totalGuests
				$scope.basics.hasMinors


			}
		}

}]);