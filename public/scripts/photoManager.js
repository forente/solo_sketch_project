angular.module('doodleApp').controller('managerController', function($http){
  var vm = this;

  vm.photo  = ['../image/13YellowEye.jpg','../image/13YellowEye.jpg','../image/13YellowEye.jpg','../image/13YellowEye.jpg','../image/13YellowEye.jpg'];

  $http.get('/photos').then(successHandler, failureHandler);

  var successHandler = function (res){
    vm.photoFiles = res.data;
  };

  var failureHandler = function(res){

  }



});
