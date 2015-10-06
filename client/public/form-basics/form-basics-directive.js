


angular.module('directives').
	directive("formBasicsTemplate", [function(){
		return {
			restrict: 'E',
			scope: {
				basics: "="
			},
			templateUrl: "form-basics/form-basic.html",
			controller: function($scope){

			}
		}

}]);