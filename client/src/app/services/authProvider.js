angular.module('authServices', [])
  .service('Auth', function ($location) {

    return {
      setUser: function (token) {
        localStorage.setItem('jwtToken', token)
        $location.path('/todos')
      },
      isLoggedIn: function () {
        return localStorage.jwtToken ? true : false
      },
      logout: function(){
        localStorage.removeItem('jwtToken')
        setTimeout(() => {
          location.reload()
        },500)
      }
    }
  })