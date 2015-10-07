angular.module('eventDirectives').
	directive("foodMenuTemplate", [function(){
		return {
			restrict: 'E',
			scope: {
				menu: "="
			},
			templateUrl: "form-menu/food-menu/food-menu.html",
			link: function(scope, element, attrs){
				console.log("food menu");


				// $scope.menu.bev = {};
				// scope.menu.bev.selected = [];
				scope.menu.toggle.food = "app";
				// scope.menu.food.beerSelect;



				scope.addFood = function(item){
					console.log(scope.menu.food.selected);
					scope.menu.food.selected.push({item: item, quantity: 1});
				}
			}
		};

}]);