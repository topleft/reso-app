angular.module('adminDirectives')
	.directive('adminBevOutput', [ 'adminBevFactory', 'frontEndDataFactory', 'alertFactory', function(adminBevFactory, frontEndDataFactory, alertFactory){
			return {
				restrict: 'E',
				scope: {
					collections: '=',
					action: '='
				},
				templateUrl: 'admin/admin-bev/admin-bev-output.html',
				controller: function($scope, adminBevFactory, frontEndDataFactory){

					

					$scope.action.delete=false;

					$scope.doubleCheckDelete = function(id){
						$scope.action.id = id;
					}

					$scope.deleteItem = function (id){
						adminBevFactory.deleteBevItem(id)
							.success(function(){frontEndDataFactory.findAndDelete(id, $scope.collections.bevs);
								alertFactory.add('success', "Success! Bev Item DELETED from the database")
								$scope.action.id = false;
							});
					};



					$scope.toggleUpdate = function(id) {
						$scope.update = id;

					};

					$scope.updateBevItem = function(id, item, type, servingSize, menuPrice, costPerServing) {
						adminBevFactory.updateBevItem(id, item, type, servingSize, menuPrice, costPerServing)
							.success(function(response){
								alertFactory.add('success', "Success! Bev Item UPDATED in the database.");
								$scope.update = false;
							})
					};
				
				}  
			};

	}]);