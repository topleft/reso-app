angular.module('adminDirectives')
	.directive('adminTemplate', ['adminBevFactory', 'adminFoodFactory', 'frontEndDataFactory', 'alertFactory', function(adminBevFactory, adminFoodFactory, frontEndDataFactory, alertFactory){
			return {
				restrict: 'E',
				scope: {
					collections: '=',
					action: '='
				},
				templateUrl: 'admin/admin-create.html',
				controller: function($scope, adminFoodFactory, frontEndDataFactory){

					$scope.action = {};
					$scope.update = false;
					$scope.admin = {}
					$scope.admin.bevs = {}
					$scope.admin.food = {}
					$scope.collections = {};
					$scope.collections.bevs = [];
					$scope.collections.food = [];


					getAllBevItems();

					function getAllBevItems (){
						adminBevFactory.getAllBevItems()
							.success(function(response){
								$scope.collections.bevs = response;
							});
						}
		
					
		
			}
		}
}]);