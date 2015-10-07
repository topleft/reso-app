// bev crud and food crud

angular.module('factories')
	.factory( "adminBevFactory", ["$http",function($http){
		var baseUrl = "/api/v1";

		return {
			createBevItem: function(item, type, servingSize, menuPrice, costPerServing) {
				return $http({
						method: 'POST', 
						url: baseUrl+'/bevs',
						data: {item: item, type: type, servingSize: servingSize, menuPrice: menuPrice, costPerServing: costPerServing}
					});
			},
			getBevItem: function(id) {
				return $http.get(baseUrl+'/bevs/'+id);
			},
			getAllBevItems: function() {
				return $http.get(baseUrl+'/bevs');
			},
			updateBevItem: function(id, item, type, servingSize, menuPrice, costPerServing) {
				return $http({
						method: 'PUT',
						url: baseUrl+'/bevs/'+id,
						data: {item: item, type: type, servingSize: servingSize, menuPrice: menuPrice, costPerServing: costPerServing}
					});
			},
			deleteBevItem: function(id) {
				return $http.delete(baseUrl+'/bevs/'+id);
			},
			isValidBevItem: function(name, type, items){

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


