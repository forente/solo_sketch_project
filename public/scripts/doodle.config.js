angular.module('doodleApp').config(['$routeProvider', '$locationProvider'], function($routeProvider, $locationProvider){
  $routeProvider
  .when('login',{
    templateUrl:'/views/login.html',
    controller:'loginController',
    controllerAs:'in'
  })
  .when('/register',{
    templateUrl:'/views/register.html',
    controller:'registerController',
    controllerAs:'regCo'
  })
  .when('main'{
    templateUrl:'/views/main.html',
    controller:'padController',
    controllerAs:'pad'
  })

  $locationProvider.html5Mode(true);
});
