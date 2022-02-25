angular.module('todoServices', [])
  .service('Todos',function($http){

    this.get = () => {
      return $http.get('/api/todos')
    }

    this.post = (params) => {
      return $http.post('/api/todos',params)
    } 
    this.update = (params) => {
      return $http.put('/api/todos/update' , params)
    }
    this.delete = (id) => {
      return $http.delete('/api/todos/' + id)
    }

  })