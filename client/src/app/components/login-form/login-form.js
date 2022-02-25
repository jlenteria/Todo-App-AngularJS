angular.module('todoApp')
	.component('loginForm', {
		templateUrl: 'app/components/login-form/login-form.html',
		controller: 'LoginCtrl'
	})
	.controller('LoginCtrl', ($scope, Auth,User,$location) => {
		$scope.submit = () => {
			$scope.params = {
				username: $scope.username,
				password: $scope.password
			}

			User.login($scope.params).then((res) => {
				const {data} = res
				if(data.error)alert(`ERROR: ${data.error}`)
				else {
					const token = data.access_token
					Auth.setUser(token)
				}
			}).catch(e => console.log(e))

		}

	})