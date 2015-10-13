angular.module('eventDirectives').
	directive("formMenuTemplate", [ 'formBasicsFactory', function(formBasicsFactory){
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


				formBasicsFactory.getPopulatedUser()
				.success(function(user){
					$scope.menu.userId = user._id;
					$scope.menu.eventId = user.events._id;
					$scope.menu.menuId = user.events.menu._id;
					$scope.menu.bevMenuId = user.events.menu.bevs._id;
					$scope.menu.foodMenuId = user.events.menu.food._id;
					$scope.menu.bev.selected = user.events.menu.bevs.items;
					$scope.menu.food.selected = user.events.menu.food.items;
				})
				.catch(function(err){
					console.log("This user has no events yet!");
				})



			}
		};

}]);