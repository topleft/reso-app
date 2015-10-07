angular.module('eventDirectives').
	directive("formMenuTemplate", [function(){
		return {
			restrict: 'E',
			scope: {
				menu: "="
			},
			templateUrl: "form-menu/form-menu.html",
			controller: function($scope){
				console.log("menu");


				$scope.menu = {};
				$scope.menu.food = {};
				$scope.menu.bev = {};
				$scope.menu.toggle = {};
				$scope.menu.start;
				$scope.menu.end;
				$scope.menu.totalGuests;
				$scope.menu.hasMinors;


				

				$scope.menu.bev.selected = [];
				$scope.menu.food.selected = [];
				// $scope.menu.toggle.bev = "beer";


				$scope.addItem = function(item){
					console.log(item)
					$scope.menu.bev.selected.push({item: item, quantity: 1});
				}
			}
		};

}]);