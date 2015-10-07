angular.module("adminDirectives")
	.directive("adminBevForm", [function(){
		return {
			restrict: 'E',
			scope: {
				admin: "="
			},
			templateUrl: "admin/admin-bev/admin-bev-form.html",
			controller: function ($scope){
				console.log("admin-bev");
				$scope.admin = {};
				$scope.admin.food = {};
			}
		};
}]);