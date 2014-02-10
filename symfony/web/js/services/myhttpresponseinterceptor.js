app.factory('myHttpResponseInterceptor',['$q','$location',function($q,$location){
  return {
    response: function(response){
      return promise.then(
        function success(response) {
        return response;
      },
      function error(response) {
        if(response.status === 401){
          $location.path('/signin');
          return $q.reject(response);
        }
        else{
          return $q.reject(response); 
        }
      });
    }
  }
}]);

//Http Intercpetor to check auth failures for xhr requests
app.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);