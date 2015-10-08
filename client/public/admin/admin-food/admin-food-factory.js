// bev crud and food crud

angular.module('factories')
	.factory( "adminFoodFactory", ["$http",function($http){
		console.log("food Factory")
		var baseUrl = "/api/v1";

		return {
			createFoodItem: function(item, course, menuPrice, costPerServing) {
				return $http({
						method: 'POST', 
						url: baseUrl+'/food',
						data: {item: item, course: course, menuPrice: menuPrice, costPerServing: costPerServing}
					});
			},
			getFoodItem: function(id) {
				return $http.get(baseUrl+'/food/'+id);
			},
			getAllFoodItems: function() {
				return $http.get(baseUrl+'/food');
			},
			updateFoodItem: function(id, item, course, menuPrice, costPerServing) {
				return $http({
						method: 'PUT',
						url: baseUrl+'/food/'+id,
						data: {item: item, course: course, menuPrice: menuPrice, costPerServing: costPerServing}
					});
			},
			deleteFoodItem: function(id) {
				return $http.delete(baseUrl+'/food/'+id);
			},
			isValidFoodItem: function(name, type, items){

				var name = name.toLowerCase();
				var type = type.toLowerCase();

				for (var i = 0; i < items.length; i++) {
					if (items[i].name.toLowerCase() === name && items[i].type.toLowerCase() === type) {
						return false;
					}
				}
				return true;
			}
		};
}]);


