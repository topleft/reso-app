
angular.module('factories')
	.factory( "bevMenuFactory", ["$http",function($http){
		var baseUrl = "/api/v1";

		return {
			getAllBevOptions: function(){
				return $http.get(baseUrl+'/bevs');
			},
			addBevItem: function(bevId, bevMenuId) {
				console.log(bevId, bevMenuId);
				return $http({
						method: 'POST', 
						url: baseUrl+'/menu/'+bevMenuId+'/bev',
						data: {id: bevId}
					});
			},
			getBevItem: function(menuId, bevId) {
				return $http.get(baseUrl+'/bevs/menu/'+menuId+'/'+bevId);
			},
			getAllBevItems: function() {
				return $http.get(baseUrl+'/bevs/menu');
			},
			updateBevItem: function(menuId, bevItemId, quantity) {
				return $http({
						method: 'PUT',
						url: baseUrl+'/bevs/menu/'+menuId+'/'+bevId,
						data: {quantity: quantity}
					});
			},
			deleteBevItem: function(menuId, bevId) {
				return $http.delete(baseUrl+'/bevs/menu/'+menuId+'/'+bevId)
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


