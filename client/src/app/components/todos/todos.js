angular.module('todoApp')
	.component('todos', {
		templateUrl: 'app/components/todos/todos.html',
		controller: 'TodosCtrl'
	})
	.controller('TodosCtrl', ($scope) => {
		console.log("This is great")
	})