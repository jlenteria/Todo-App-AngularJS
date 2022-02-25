angular.module('todoApp')
	.component('registerForm',{
		templateUrl: 'app/components/register-form/register-form.html',
		controller: 'RegisterCtrl'
	})
	.controller('RegisterCtrl', ($scope, User, $location) => {
		$scope.submit = () => {
			$scope.params = {
				name: $scope.name,
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			}

			User.register($scope.params).then(res => {
				const {data} = res
				if(data.error)alert(`ERROR: ${data.error}`)
				else{
					alert ("Register Successfully")
					$location.path('/login')
				}
			}).catch(e => console.log(e))

		}
	})