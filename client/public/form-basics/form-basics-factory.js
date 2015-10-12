angular.module('factories')
	.factory('formBasicsFactory', [ '$http', 
		function($http){
	
			var baseUrl = "/api/v1";

			return {
			// submit form info to create new event
				createEvent: function(userId){
					$http.post(baseUrl + '/events/' + userId)
				}
			}

///////////!!!!!!!! need to remember how to submit info with $http

	}]);