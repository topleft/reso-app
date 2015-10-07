angular.module("adminDirectives")
	.directive("adminBevForm", [ 'adminBevFactory', function(adminBevFactory){
		return {
			restrict: 'E',
			scope: {
				admin: "=",
				collections: "="
			},
			templateUrl: "admin/admin-bev/admin-bev-form.html",
			controller: function ($scope, adminBevFactory){
				$scope.admin = {};
				$scope.admin.bev = {};
				$scope.collections.bevs = [];



				$scope.createBevItem = function(){
						adminBevFactory.createBevItem($scope.admin.bev.item, $scope.admin.bev.type, $scope.admin.bev.servingSize, $scope.admin.bev.menuPrice, $scope.admin.bev.costPerServing)
							.success(function(response){
								$scope.collections.bevs.push(response);
							});

				}

				console.log("admin-bev");
			}
		};
}]);