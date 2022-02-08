angular.module('appRoutes', ['ngRoute'])

	.config(($routeProvider, $locationProvider) => {
			$routeProvider
			.when('/todos',{
				templateUrl: 'app/pages/home.html'
			})
			.when('/login',{
				templateUrl: 'app/pages/login.html'
			})
			.when('/register', {
				templateUrl: 'app/pages/register.html'
			})

			.otherwise('/todos')

			$locationProvider.html5Mode(true)
		
	})