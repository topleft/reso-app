angular.module('directives').
	directive("bevMenuTemplate", ['bevMenuFactory' ,'formBasicsFactory', function( bevMenuFactory, formBasicsFactory){
		return {
			restrict: 'E',
			scope: {
				menu: '='

			},
			templateUrl: "form-menu/bev-menu/bev-menu.html",
			link: function(scope, element, attrs){
				console.log("bev menu");


				// $scope.menu.bev = {};
				scope.menu.bev.selected = [];
				scope.menu.toggle.bev = "beer";
				scope.menu.bev.beerSelect;
				scope.user = {};
				scope.user.userId = ""; 
				scope.user.eventId;
				scope.user.menuId;
				scope.user.bevMenuId = "";
				scope.user.foodMenuId;

				formBasicsFactory.getPopulatedUser()
				.success(function(user){
					console.log("User", user.events.menu.bevs._id)

					scope.user.userId = user._id;
					scope.user.eventId = user.events._id;
					scope.user.menuId = user.events.menu._id;
					scope.user.bevMenuId = user.events.menu.bevs._id;
					scope.user.foodMenuId = user.events.menu.food._id;
				})
				.catch(function(err){
					console.log(err)
				})

				console.log("Scope.....$$$: ", scope.user.bevMenuId);

				scope.addBev = function(bevItemId){
					console.log("Bev Item????: ", bevItemId)
					bevMenuFactory.addBevItem(bevItemId, scope.user.bevMenuId)
					.success(function(bevItems){
						console.log("Bev Items???? ",bevItems)
						scope.menu.bev.selected = bevItems.items;
					})
					.catch(function(err){
						console.log(err);
					})
					// scope.menu.bev.selected.push({item: bevItem.item, quantity: bevItem.quantity});
				};

				scope.populateBevs = function(){
					bevMenuFactory.getAllBevOptions()
					.success(function(options){
						scope.menu.bev.options = options;
						console.log(scope.menu.bev.options);
					});
				};

				scope.populateBevs();
			}
		};

}]);