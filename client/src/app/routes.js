angular.module('appRoutes', ['ngRoute'])

	.config(($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/todos', {
				templateUrl: 'app/pages/home.html'
			})
			.when('/login', {
				templateUrl: 'app/pages/login.html'
			})
			.when('/register', {
				templateUrl: 'app/pages/register.html'
			})

			.otherwise({redirectTo: '/todos'})

		$locationProvider.html5Mode(true)

	})
	.run(['$rootScope', '$location', 'Auth','$http', function ($rootScope, $location, Auth, $http) {
		$rootScope.$on('$routeChangeStart', function () {
			if (!Auth.isLoggedIn() && $location.$$path !== '/register') {
				$location.path('/login');
			}
			const local_token = localStorage.jwtToken
	    if(local_token)
	    {
	      $http.defaults.headers.common['Authorization'] = `Bearer ${local_token}`
	    }
		});
	}]);