angular.module('directives')
	.directive('navTemplate', [function(){
		return {
			restrict: 'E',
			templateUrl: 'nav/nav.html',
			link: function(scope, element, attrs){
			}
		};
	}]);

