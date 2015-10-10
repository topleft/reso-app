angular.module('eventDirectives')
	.directive('outputBevTemplate', [ 'bevMenuFactory', 'frontEndDataFactory', 'alertFactory', function(bevMenuFactory, frontEndDataFactory, alertFactory){
			return {
				restrict: 'E',
				scope: {
					collections: '=',
					action: '='
				},
				templateUrl: '/form-menu/output-bev/output-bev.html',
				controller: function($scope, bevMenuFactory, frontEndDataFactory){
					console.log('bev output directive')
					// get current user items if menu has been stored

					// $scope.action.delete = false;

					$scope.doubleCheckDelete = function(id){
						$scope.action.id = id;
					};

					$scope.deleteBevItem = function (menuId, bevId){
						bevMenuFactory.deleteBevItem(menuId, bevId)
							.success(function(){frontEndDataFactory.findAndDelete(id, $scope.collections.items);
								alertFactory.add('success', "Success! Item DELETED from the database")
								$scope.action.id = false;
							});
					};



					$scope.toggleUpdate = function(bevId) {
						$scope.update = id;
					};

					$scope.updateItem = function(menuId, bevId, quantity) {
						menuBevFactory.updateBevItem(menuId, bevId, quantity)
							.success(function(response){
								alertFactory.add('success', "Success! Item UPDATED in the database.");
								$scope.update = false;
							})
					};
				
				}  
			};

	}]);