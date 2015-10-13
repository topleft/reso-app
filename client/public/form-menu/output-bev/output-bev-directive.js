angular.module('eventDirectives')
	.directive('outputBevTemplate', [ 'formBasicsFactory','bevMenuFactory', 'frontEndDataFactory', 'alertFactory', function(formBasicsFactory, bevMenuFactory, frontEndDataFactory, alertFactory){
			return {
				restrict: 'E',
				scope: {
					collections: '=',
					action: '='
				},
				templateUrl: '/form-menu/output-bev/output-bev.html',
				controller: function($scope, bevMenuFactory, frontEndDataFactory){
					console.log('bev output directive: ', $scope.collections)
					// get current user items if menu has been stored
					$scope.action = {};
					$scope.action.delete = false;
					$scope.update = false;
					$scope.menu = {};
					
					formBasicsFactory.getPopulatedUser()
						.success(function(user){
						$scope.menu.userId = user._id;
						$scope.menu.eventId = user.events._id;
						$scope.menu.menuId = user.events.menu._id;
						$scope.menu.bevMenuId = user.events.menu.bevs._id;
						$scope.menu.foodMenuId = user.events.menu.food._id;
						})
						.catch(function(err){
							console.log("This user has no events yet!");
						})

					$scope.doubleCheckDelete = function(id){
						$scope.action.id = id;
					};

					$scope.deleteItem = function (bevId){
						console.log("delete town")
						bevMenuFactory.deleteBevItem($scope.menu.bevMenuId, bevId)
							.success(function(){frontEndDataFactory.findAndDelete(bevId, $scope.collections);
								alertFactory.add('success', "Success! Item DELETED from the database")
								$scope.action.id = false;
							})
							.catch(function(err){
								console.log(err);
							})
					};



					$scope.toggleUpdate = function(bevId) {
						$scope.update = bevId;
					};

					$scope.updateItem = function(menuId, bevId, quantity) {
						bevMenuFactory.updateBevItem(menuId, bevId, quantity)
							.success(function(response){
								alertFactory.add('success', "Success! Item UPDATED in the database.");
								$scope.update = false;
							})
					};
				
				}  
			};

	}]);