angular.module("adminDirectives")
	.directive("adminFoodForm", [ 'adminFoodFactory', function(adminFoodFactory){
		return {
			restrict: 'E',
			scope: {
				admin: "=",
				collections: "="
			},
			templateUrl: "admin/admin-food/admin-food-form.html",
			controller: function ($scope, adminFoodFactory){



				$scope.createFoodItem = function(){
						adminFoodFactory.createFoodItem($scope.admin.food.item, $scope.admin.food.type, $scope.admin.food.servingSize, $scope.admin.food.menuPrice, $scope.admin.food.costPerServing)
							.success(function(response){
								$scope.collections.food.push(response);
							});

				}

				console.log("admin-food");
			}
		};
}]);