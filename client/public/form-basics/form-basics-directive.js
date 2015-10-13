


angular.module('eventDirectives').
	directive("formBasicsTemplate", [ 'formBasicsFactory', function(formBasicsFactory){
		return {
			restrict: 'E',
			scope: {
				basics: "="
			},
			templateUrl: "form-basics/form-basics.html",
			controller: function($scope, formBasicsFactory){
				console.log($scope.$parent.username)
				$scope.basics = {};
				$scope.basics.date;
				$scope.basics.start;
				$scope.basics.end;
				$scope.basics.totalGuests;
				$scope.basics.isSurprise;
				$scope.basics.userId;

				$scope.basics.createEvent = function(){
					formBasicsFactory.createEvent(
								$scope.basics.date,
								$scope.basics.start,
								$scope.basics.end,
								$scope.basics.totalGuests,
								$scope.basics.isSurprise )
						.success(function(result){
							console.log('create event: ', result.user);
							$scope.basics.userId = result.user._id;
							$scope.basics.eventId = result.user.events._id;
							$scope.basics.menuId = result.user.events.menu._id;
							$scope.basics.bevMenuId = result.user.events.menu.bevs._id;
							$scope.basics.foodMenuId = result.user.events.menu.food._id;
						})
						.error(function(err){
							console.log(err);
						})
				}


			}
		}

}]);