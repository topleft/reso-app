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
				console.log("Bev Form Dir: ",$scope.collections.bevs );


				$scope.createBevItem = function(){
						adminBevFactory.createBevItem($scope.admin.bev.item, $scope.admin.bev.type, $scope.admin.bev.servingSize, $scope.admin.bev.menuPrice, $scope.admin.bev.costPerServing)
							.success(function(response){
								console.log(response)
								$scope.collections.bevs.push(response[0]);
							});

				}

				console.log("admin-bev");
			}
		};
}]);