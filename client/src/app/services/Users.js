angular.module('userServices', [])
  .service('User', function($http){
     
     this.login = (params) => {
        return $http.post('/api/login',params)
     }

     this.register = (params) => {
        return $http.post('/api/register',params)
     }   


  })