angular.module('adminDirectives')
	.directive('adminFoodOutput', [ 'adminFoodFactory', 'frontEndDataFactory', 'alertFactory', function(adminFoodFactory, frontEndDataFactory, alertFactory){
			return {
				restrict: 'E',
				scope: {
					collections: '=',
					action: '='
				},
				templateUrl: 'admin/admin-food/admin-food-output.html',
				controller: function($scope, adminFoodFactory, frontEndDataFactory){

					
					getAllFoodItems();
					function getAllFoodItems (){
						adminFoodFactory.getAllFoodItems()
							.success(function(response){
								console.log(response);
								$scope.collections.food = response;
							});
					}

					$scope.action.delete=false;

					$scope.doubleCheckDelete = function(id){
						$scope.action.id = id;
					}

					$scope.deleteFoodItem = function (id){
						console.log("delete pressed")
						adminFoodFactory.deleteFoodItem(id)
							.success(function(){frontEndDataFactory.findAndDelete(id, $scope.collections.food);
								alertFactory.add('success', "Success! Food Item DELETED from the database")
								$scope.action.id = false;
							});
					};



					$scope.toggleUpdate = function(id) {
						$scope.update = id;

					};

					$scope.updateFoodItem = function(id, item, type, servingSize, menuPrice, costPerServing) {
						adminFoodFactory.updateFoodItem(id, item, type, servingSize, menuPrice, costPerServing)
							.success(function(response){
								alertFactory.add('success', "Success! Food Item UPDATED in the database.");
								$scope.update = false;
							});
					};
				
				}  
			};

	}]);