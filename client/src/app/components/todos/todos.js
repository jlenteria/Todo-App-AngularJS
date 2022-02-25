angular.module('todoApp')
	.component('todos', {
		templateUrl: 'app/components/todos/todos.html',
		controller: 'TodosCtrl'
	})
	.controller('TodosCtrl', ($scope, Todos,Auth) => {
		$scope.opts = {
			enable: false,
			btn: "add"
		}	

		function load (){
			Todos.get().then(res => {
				$scope.todos = res.data.allTodos
			}).catch(e => console.log(e))
		}	

		$scope.addBtn = () => {
			$scope.opts = {
				enable: true,
				btn: 'add'
			}	
		}
		$scope.updateBtn = (params) => {
			$scope.opts = {
				enable: true,
				btn: 'update'
			}	
			$scope.id = params.id
			$scope.title = params.title
		}



		$scope.submit = () => {
			if($scope.opts.btn === 'add')
			{
				Todos.post({title: $scope.title}).then(res => {
					$scope.opts = {
						enable: false,
						btn: "add"
					}	
					load()
				}).catch(e => console.log(e))
			}

			else if($scope.opts.btn === 'update'){
				$scope.opts = {
					enable: false,
					btn: "add"
				}	
				Todos.update({title: $scope.title, id: $scope.id}).then(res => {
					load()
				})
			}

		}


		$scope.delete = (id) => {
			if (confirm('Are you sure you want to delete ? ') === true){
				Todos.delete(id).then(res => {
					load()
				})
			}	
		}

		$scope.finish = (t) => {
			Todos.update(t).then(res => {
				load()
			})
		}

		$scope.logout = () => {
			Auth.logout()
		}


		load()

	})