angular.module("myApp", ['routes', 'directives',, 'eventDirectives', 'factories'])
	// .run(function ($rootScope, $location, $route, authFactory) {
	//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
	//     if (next.access.restricted && authFactory.isLoggedIn() === false) {
	//       $location.path('/login');
	//       $route.reload();
	//     }
	//   });
	// }); 


