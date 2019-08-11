angular.module('doodleApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/',{
    templateUrl:'/views/login.html',
    controller:'loginController',
    controllerAs:'in'
  })
  .when('/register',{
    templateUrl:'/views/register.html',
    controller:'registerController',
    controllerAs:'regCo'
  })
  .when('/home',{
    templateUrl:'/views/doodleView.html',
    controller:'padController',
    controllerAs:'pad'
  })
  .when('/manage',{
    templateUrl:'/views/photoManager.html',
    controller:'managerController',
    controllerAs:'mgr'
  })

  $locationProvider.html5Mode(true);
}]);
