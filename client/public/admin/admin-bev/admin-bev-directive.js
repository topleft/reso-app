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


				$scope.createBevItem = function(){
						adminBevFactory.createBevItem($scope.admin.bev.item, $scope.admin.bev.type, $scope.admin.bev.servingSize, $scope.admin.bev.menuPrice, $scope.admin.bev.costPerServing)
							.success(function(response){
								console.log(response)
								$scope.collections.bevs.push(response[0]);
								$scope.admin.bev = {};
							});

				}

				console.log("admin-bev");
			}
		};
}]);