angular.module('directives').
	directive("bevMenuTemplate", [function(){
		return {
			restrict: 'E',
			scope: {
				menu: "="
			},
			templateUrl: "form-menu/bev-menu/bev-menu.html",
			link: function(scope, element, attrs){
				console.log("bev menu");


				// $scope.menu.bev = {};
				// scope.menu.bev.selected = [];
				scope.menu.toggle.bev = "beer";
				scope.menu.bev.beerSelect;



				scope.addBev = function(item){
					console.log(scope.menu.bev.selected);
					scope.menu.bev.selected.push({item: item, quantity: 1});
				}
			}
		};

}]);