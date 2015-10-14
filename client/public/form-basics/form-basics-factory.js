angular.module('factories')
	.factory('formBasicsFactory', [ '$http', 
		function($http){
	
			var baseUrl = "/api/v1";

			return {
			// submit form info to create new event
				createEvent: function(date, start, end, totalGuests, isSurprise){
					var parsedDate = Date.parse(date);
					console.log(date);
					console.log(parsedDate);
					return $http.post(baseUrl + '/events/create', 
						{
							date: parsedDate,
							start: start,
							end: end,
							totalGuests: totalGuests, 
							isSurprise: isSurprise
						});
				},
				getPopulatedUser: function(){
					return $http.get(baseUrl + '/user/populated');
				}

			};
	}]);